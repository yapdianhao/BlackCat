import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { cloneMap } from "../helper/CloneMap";
import sideDrawerClass from "../styles/SideDrawer.module.scss";
import LaterSearchTool from "./laterSearchTool";
import FilterButton from "./FilterButton";
import SideDrawerSearchButton from "./SideDrawerSearchButton";
import { Event } from "../server/model/event";
import { renderDate } from "../helper/DateHelper";
import { renderMonthNumeric } from "../helper/DateHelper";
import { Channel } from "../server/model/channel";
import { store } from "../store/store";
import { getAll, getByChannel } from "../helper/FilterButtonFunctions";
import ButtonHelperFunctions from "../helper/FilterButtonFunctions";
import { start } from "repl";

interface SideDrawerProps {
  shouldShow: boolean;
  shouldShowSearchResults: boolean;
  handleShouldShowSearchResults: React.MouseEventHandler<HTMLDivElement>;
  searchResultsSummaryString: string;
  setSearchResultsSummaryString: React.Dispatch<React.SetStateAction<string>>;
}

const SideDrawer: React.FC<SideDrawerProps> = (props) => {
  // css style to render drawer
  let drawerClass = props.shouldShow
    ? `${sideDrawerClass.sideDrawer} ${sideDrawerClass.open}`
    : `${sideDrawerClass.sideDrawer}`;

  const dateFilterKeyWords = [
    "ANYTIME",
    "TODAY",
    "TOMORROW",
    "THIS WEEK",
    "THIS MONTH",
    "LATER",
  ];

  const buttonTimeStates: [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>
  ][] = [];

  console.log("rerender sidedrawer");

  const [buttonStateMap, setButtonStatemap] = useState<Map<string, boolean>>(
    new Map()
  );

  for (let i = 0; i < dateFilterKeyWords.length; i++) {
    buttonTimeStates.push(useState(false));
  }

  const [startSearchDate, setStartSearchDate] = useState("");
  const [endSearchDate, setEndSearchDate] = useState("");
  const [shouldShowRangeSearch, setShouldShowRangeSearch] =
    buttonTimeStates[buttonTimeStates.length - 1];

  const toggleSearchDateRange = async () => {
    console.log(startSearchDate);
    const filteredData = await fetch(
      `http://localhost:5000/api/eventsrange/${startSearchDate}/${endSearchDate}`
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        return data;
      });
    return filteredData;
  };

  const allButtonHelperFunctions = [getAll, ...ButtonHelperFunctions];

  const [allChannels, setChannels] = useState<Channel[]>([
    { channelName: "All Channels" },
  ]);

  const [allChannelButtonFunctions, setAllChannelButtonFunctions] = useState<
    Function[]
  >([getAll]);

  const fetchAllChannels = async () => {
    await fetch("http://localhost:5000/api/channels")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setChannels((allChannels) => {
          if (allChannels === undefined) return data;
          else {
            return [...allChannels, ...data];
          }
        });

        setAllChannelButtonFunctions([
          ...allChannelButtonFunctions,
          ...Array.from({ length: data.length }, (i) => getByChannel),
        ]);
      });
  };

  const handleMapChange = (key: any, value: any) => {
    const clonedMap = cloneMap(buttonStateMap);
    buttonStateMap.set(key, value);
    setButtonStatemap(cloneMap);
  };

  const setSearchedString = () => {
    let searchString = "";
    console.log(buttonStateMap);
    for (const k of buttonStateMap.keys()) {
      if (buttonStateMap.get(k)) {
        searchString += `${searchString === "" ? "Channel" : ""} ${
          searchString.length === 0 ? "" : ", "
        } ${k} `;
      }
    }
    let matchedTime = false;
    for (let i = 0; i < buttonTimeStates.length; i++) {
      if (buttonTimeStates[i][0] && i !== buttonTimeStates.length - 1) {
        if (!matchedTime) {
          matchedTime = !matchedTime;
          searchString += "Activities ";
        }
        searchString += dateFilterKeyWords[i];
      } else if (buttonTimeStates[i][0] && i === buttonTimeStates.length - 1) {
        if (
          isNaN(new Date(startSearchDate).getDay()) &&
          isNaN(new Date(endSearchDate).getDay())
        ) {
          searchString += "";
        }
        const startDay = renderDate(new Date(startSearchDate));
        const startMonth = renderMonthNumeric(new Date(startSearchDate));
        const endDay = renderDate(new Date(endSearchDate));
        const endMonth = renderMonthNumeric(new Date(endSearchDate));
        searchString += `from ${startDay < 10 ? "0" + startDay : startDay} ${
          startMonth < 10 ? "0" + startMonth : startMonth
        } / ${endDay < 10 ? "0" + endDay : endDay} ${
          endMonth < 10 ? "0" + endMonth : endMonth
        }`;
      }
    }
    console.log(searchString);
    props.setSearchResultsSummaryString(searchString);
  };

  useEffect(() => {
    fetchAllChannels();
    //setSearchedString();
  }, []);

  return (
    <div className={drawerClass}>
      <div className={sideDrawerClass.dateTitle}>
        <div>DATE</div>
      </div>
      <div className={sideDrawerClass.filterButtonArea}>
        {dateFilterKeyWords.map((keyword, index) => (
          <FilterButton
            buttonStates={buttonTimeStates}
            setMapBool={null}
            stateBoolMap={null}
            allButtonFunctions={allButtonHelperFunctions}
            buttonText={keyword}
            key={index}
            idx={index}
            type={index === dateFilterKeyWords.length - 1 ? "search" : "time"}
            setSearchString={setSearchedString}
            handleClick={
              index === buttonTimeStates.length - 1
                ? null
                : allButtonHelperFunctions[index]
            }
          />
        ))}
      </div>
      {shouldShowRangeSearch ? (
        <LaterSearchTool
          firstListener={setStartSearchDate}
          secondListener={setEndSearchDate}
          setSearchResultSummary={setSearchedString}
        />
      ) : null}
      <div className={sideDrawerClass.dateTitle}>
        <div>CHANNEL</div>
      </div>
      <div className={sideDrawerClass.filterButtonArea}>
        {allChannels &&
          allChannels.map((channel, index) => (
            <FilterButton
              buttonStates={null}
              setMapBool={handleMapChange}
              stateBoolMap={buttonStateMap}
              allButtonFunctions={allButtonHelperFunctions}
              buttonText={channel.channelName}
              key={index}
              idx={index}
              type="channel"
              setSearchString={setSearchedString}
              handleClick={
                allChannelButtonFunctions && allChannelButtonFunctions[index]
              }
            />
          ))}
      </div>
      <SideDrawerSearchButton
        searchResultsSummaryString={props.searchResultsSummaryString}
        shouldHandleSearchRange={shouldShowRangeSearch}
        handleSearchRange={toggleSearchDateRange}
        shouldShowSearchResults={props.shouldShowSearchResults}
        handleSearchClick={props.handleShouldShowSearchResults}
      />
    </div>
  );
};

export default SideDrawer;
