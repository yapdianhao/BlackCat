import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import "../styles/SideDrawer.scss";
import FilterButton from "../components/FilterButton";
import SideDrawerSearchButton from "./SideDrawerSearchButton";
import { Event } from "../server/model/event";
import { Channel } from "../server/model/channel";
import { store } from "../store/store";
import ButtonHelperFunctions from "../helper/FilterButtonFunctions";

interface SideDrawerProps {
  shouldShow: boolean;
  shouldShowSearchResults: React.Dispatch<React.SetStateAction<boolean>>;
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

  const channelFilterKeyWords = [
    "Channel 1",
    "Channel 2",
    "Channel 3",
    "Channel 4",
    "Channel 5",
    "Channel Long Name",
    "Channel 6",
  ];

  const fetchAllEvents = async () => {
    const allEvents: Event[] = await fetch("http://localhost:5000/api/events")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      });
    return allEvents;
  };

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

  console.log(store.getState());

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
            handleClick={ButtonHelperFunctions[index]}
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
              handleClick={() => console.log("click channel")}
            />
          ))}
      </div>
      <SideDrawerSearchButton
        handleClick={() => props.shouldShowSearchResults(true)}
      />
    </div>
  );
};

export default SideDrawer;
