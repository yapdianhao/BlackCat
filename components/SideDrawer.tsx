import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import "../styles/SideDrawer.scss";
import FilterButton from "../components/FilterButton";
import SideDrawerSearchButton from "./SideDrawerSearchButton";

interface SideDrawerProps {
  shouldShow: boolean;
}

const SideDrawer: React.FC<SideDrawerProps> = (props) => {
  // css style to render drawer
  let drawerClass = props.shouldShow ? "side-drawer open" : "side-drawer";

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

  return (
    <div className={drawerClass}>
      <div className="date-title">
        <div>DATE</div>
      </div>
      <div className="filter-button-area">
        {dateFilterKeyWords.map((keyword, index) => (
          <FilterButton buttonText={keyword} key={keyword} type="time" />
        ))}
      </div>
      <div className="date-title">
        <div>CHANNEL</div>
      </div>
      <div className="filter-button-area">
        {channelFilterKeyWords.map((keyword, index) => (
          <FilterButton buttonText={keyword} key={keyword} type="channel" />
        ))}
      </div>
      <SideDrawerSearchButton handleClick={() => console.log("clicked!")} />
    </div>
  );
};

export default SideDrawer;
