import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import "../styles/SideDrawer.scss";
import LaterSearchTool from "./laterSearchTool";
import FilterButton from "../components/FilterButton";
import SideDrawerSearchButton from "./SideDrawerSearchButton";
import { Event } from "../server/model/event";
import { Channel } from "../server/model/channel";
import { store } from "../store/store";
import { getAll, getByChannel } from "../helper/FilterButtonFunctions";
import ButtonHelperFunctions from "../helper/FilterButtonFunctions";
import { start } from "repl";

interface SideDrawerProps {
  shouldShow: boolean;
  shouldShowSearchResults: boolean;
  handleShouldShowSearchResults: React.MouseEventHandler<HTMLDivElement>;
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

  const [allChannels, setChannels] = useState<Channel[]>([
    { channelName: "All Channels" },
  ]);

  const [allChannelButtonFunctions, setAlChannelButtonFunctions] = useState<
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
        setButtonChannelStates(
          Array.from({ length: data.length }, (i) => (i = useState(false)))
        );
      });
  };

  const setChannelButtonFunctions = () => {
    const remainingChannelButtonFunctions: Function[] = [];
    for (let i = 0; i < allChannels.length; i++) {
      remainingChannelButtonFunctions.push(getByChannel);
    }
    console.log(remainingChannelButtonFunctions);
    setAlChannelButtonFunctions([
      ...allChannelButtonFunctions,
      ...remainingChannelButtonFunctions,
    ]);
  };

  useEffect(() => {
    fetchAllChannels();
    setChannelButtonFunctions();
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
              handleClick={
                allChannelButtonFunctions &&
                allChannelButtonFunctions[index] &&
                allChannelButtonFunctions[index]
              }
            />
          ))}
      </div>
      <SideDrawerSearchButton
        shouldHandleSearchRange={shouldShowRangeSearch}
        handleSearchRange={toggleSearchDateRange}
        shouldShowSearchResults={props.shouldShowSearchResults}
        handleSearchClick={props.handleShouldShowSearchResults}
      />
    </div>
  );
};

export default SideDrawer;
