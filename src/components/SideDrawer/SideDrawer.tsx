import React from "react";
import { useState, useEffect } from "react";

import styles from "./SideDrawer.module.scss";
import LaterSearchTool from "../LaterSearchTool/LaterSearchTool";
import FilterButton from "../FilterButton/FilterButton";
import SideDrawerSearchButton from "../SideDrawerSearchButton/SideDrawerSearchButton";
import { renderDate } from "../../../src/utils/helper/DateHelper";
import { renderMonthNumeric } from "../../../src/utils/helper/DateHelper";
import { Channel } from "../../../server/model/channel";
import {
  getAll,
  getByChannel,
} from "../../../src/utils/helper/FilterButtonFunctions";
import ButtonHelperFunctions from "../../../src/utils/helper/FilterButtonFunctions";

interface SideDrawerProps {
  shouldShow: boolean;
  shouldShowSearchResults: boolean;
  handleShouldShowSearchResults: React.MouseEventHandler<HTMLDivElement>;
  searchResultsSummaryString: string;
  setSearchResultsSummaryString: React.Dispatch<React.SetStateAction<string>>;
}

const SideDrawer: React.FC<SideDrawerProps> = (props) => {
  // css style to render drawer
  const drawerClass = props.shouldShow
    ? `${styles.sideDrawer} ${styles.open}`
    : `${styles.sideDrawer}`;

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

  const [buttonStateMap] = useState<Map<string, boolean>>(new Map());

  for (let i = 0; i < dateFilterKeyWords.length; i++) {
    buttonTimeStates.push(useState(false));
  }

  const [startSearchDate, setStartSearchDate] = useState("");
  const [endSearchDate, setEndSearchDate] = useState("");

  const toggleSearchDateRange = async () => {
    const filteredData = await fetch(
      `http://localhost:5000/api/eventsrange/${startSearchDate}/${endSearchDate}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      });
    return filteredData;
  };

  const allButtonHelperFunctions = [getAll, ...ButtonHelperFunctions];

  const [allChannels, setChannels] = useState<Channel[]>([
    { channelName: "All Channels" },
  ]);

  const [allChannelButtonFunctions, setAllChannelButtonFunctions] = useState<
    any[]
  >([getAll]);

  const fetchAllChannels = async () => {
    await fetch("http://localhost:5000/api/channels")
      .then((response) => response.json())
      .then((data) => {
        setChannels((allChannels) => {
          if (allChannels === undefined) return data;
          else {
            return [...allChannels, ...data];
          }
        });

        setAllChannelButtonFunctions([
          ...allChannelButtonFunctions,
          ...Array.from({ length: data.length }, () => getByChannel),
        ]);
      });
  };

  const handleMapChange = (key: any, value: any) => {
    buttonStateMap.set(key, value);
  };

  const setSearchedString = () => {
    let searchString = "";
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
    props.setSearchResultsSummaryString(searchString);
  };

  useEffect(() => {
    fetchAllChannels();
  }, []);

  return (
    <div className={drawerClass}>
      <div className={styles.dateTitle}>
        <div>DATE</div>
      </div>
      <div className={styles.filterButtonArea}>
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
      {buttonTimeStates[buttonTimeStates.length - 1][0] ? (
        <LaterSearchTool
          firstListener={setStartSearchDate}
          secondListener={setEndSearchDate}
          setSearchResultSummary={setSearchedString}
        />
      ) : null}
      <div className={styles.dateTitle}>
        <div>CHANNEL</div>
      </div>
      <div className={styles.filterButtonArea}>
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
        shouldHandleSearchRange={
          buttonTimeStates[buttonTimeStates.length - 1][0]
        }
        handleSearchRange={toggleSearchDateRange}
        shouldShowSearchResults={props.shouldShowSearchResults}
        handleSearchClick={props.handleShouldShowSearchResults}
      />
    </div>
  );
};

export default SideDrawer;
