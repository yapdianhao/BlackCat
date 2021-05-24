import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import "../styles/SideDrawer.scss";
import FilterButton from "../components/FilterButton";
import SideDrawerSearchButton from "./SideDrawerSearchButton";
import { Event } from "../server/model/event";
import { Channel } from "../server/model/channel";
import { store } from "../store/store";
import { getAll, getByChannel } from "../helper/FilterButtonFunctions";
import ButtonHelperFunctions from "../helper/FilterButtonFunctions";

interface SideDrawerProps {
  shouldShow: boolean;
  shouldShowSearchResults: boolean;
  handleShouldShowSearchResults: React.MouseEventHandler<HTMLDivElement>;
}

const SideDrawer: React.FC<SideDrawerProps> = (props) => {
  // css style to render drawer
  let drawerClass = props.shouldShow ? "side-drawer open" : "side-drawer";

  //const [filteredEvents, setFilteredEvents] = useState<Event[]>();
  const [allChannels, setChannels] = useState<Channel[]>([
    { channelName: "All Channels" },
  ]);

  // filterkeywords, map each into button later
  const dateFilterKeyWords = [
    "ANYTIME",
    "TODAY",
    "TOMORROW",
    "THIS WEEK",
    "THIS MONTH",
    "LATER",
  ];

  const fetchAllChannels = async () => {
    await fetch("http://localhost:5000/api/channels")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setChannels((allChannels) => {
          if (allChannels === undefined) return data;
          else return [...allChannels, ...data];
        });
      });
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
            buttonText={keyword}
            key={index}
            type="time"
            handleClick={
              index === 0 ? getAll : ButtonHelperFunctions[index - 1]
            }
          />
        ))}
      </div>
      <div className="date-title">
        <div>CHANNEL</div>
      </div>
      <div className="filter-button-area">
        {allChannels &&
          allChannels.map((channel, index) => (
            <FilterButton
              buttonText={channel.channelName}
              key={index}
              type="channel"
              handleClick={index === 0 ? getAll : getByChannel}
            />
          ))}
      </div>
      <SideDrawerSearchButton
        shouldShowSearchResults={props.shouldShowSearchResults}
        handleSearchClick={props.handleShouldShowSearchResults}
      />
    </div>
  );
};

export default SideDrawer;
