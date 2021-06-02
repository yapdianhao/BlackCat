import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import "../styles/SideDrawer.scss";
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
interface SideDrawerProps {
  shouldShow: boolean;
  shouldShowSearchResults: boolean;
  handleShouldShowSearchResults: React.MouseEventHandler<HTMLDivElement>;
  searchResultsSummaryString: string;
  setSearchResultsSummaryString: React.Dispatch<React.SetStateAction<string>>;
}

const SideDrawer: React.FC<SideDrawerProps> = (props) => {
  // css style to render drawer
  let drawerClass = props.shouldShow ? "side-drawer open" : "side-drawer";

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

  /**
   * For Jia Ying: line 45 - 47 fetches a list of buttons' state, unknown how many during run time.
   */
  const [buttonChannelStates, setButtonChannelStates] = useState<
    [boolean, React.Dispatch<React.SetStateAction<boolean>>][]
  >([]);

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

  /**
   * For Jia Ying: the list of channels is unknown. For every channel, one button is needed.
   */
  const [allChannels, setChannels] = useState<Channel[]>([
    { channelName: "All Channels" },
  ]);

  const [allChannelButtonFunctions, setAllChannelButtonFunctions] = useState<
    Function[]
  >([getAll]);

  /**
   *  For Jia Ying: this function below sets the number of buttons, sets the button states (which the error happens)
   */
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
        /**
         * The commented out code below shows this error:
         * Uncaught (in promise) Error: Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
         * 1. You might have mismatching versions of React and the renderer (such as React DOM)
         * 2. You might be breaking the Rules of Hooks
         * 3. You might have more than one copy of React in the same app
         *
         * I suspect it is the useState inside this setButtonChannelStates function.
         */

        // setButtonChannelStates(
        //   Array.from({ length: data.length }, (i) => useState(false))
        // );

        /**
         * This function pass the filter logic to the child component at line 209.
         */

        setAllChannelButtonFunctions([
          ...allChannelButtonFunctions,
          ...Array.from({ length: data.length }, (i) => getByChannel),
        ]);
      });
  };

  const setSearchedString = () => {
    let searchString = "Channel ";
    console.log("set search string here");
    for (let i = 0; i < buttonChannelStates.length; i++) {
      if (buttonChannelStates[i][0]) {
        searchString += allChannels[i].channelName + " ";
      }
    }
    for (let i = 0; i < buttonTimeStates.length; i++) {
      if (buttonTimeStates[i][0] && i !== buttonTimeStates.length - 1) {
        searchString += dateFilterKeyWords[i];
      } else if (buttonTimeStates[i][0] && i === buttonTimeStates.length - 1) {
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
      <div className="date-title">
        <div>DATE</div>
      </div>
      <div className="filter-button-area">
        {dateFilterKeyWords.map((keyword, index) => (
          <FilterButton
            buttonStates={buttonTimeStates}
            allButtonFunctions={allButtonHelperFunctions}
            buttonText={keyword}
            key={index}
            idx={index}
            type={index === buttonTimeStates.length - 1 ? "search" : "time"}
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
        />
      ) : null}
      <div className="date-title">
        <div>CHANNEL</div>
      </div>
      <div className="filter-button-area">
        {allChannels &&
          allChannels.map((channel, index) => (
            <FilterButton
              buttonStates={buttonChannelStates}
              allButtonFunctions={allButtonHelperFunctions}
              buttonText={channel.channelName}
              key={index}
              idx={index}
              type="channel"
              setSearchString={setSearchedString}
              handleClick={
                allChannelButtonFunctions &&
                allChannelButtonFunctions[index] &&
                allChannelButtonFunctions[index]
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
