import React from "react";
import { useDispatch } from "react-redux";

import sideDrawerSearchButtonClass from "../styles/SideDrawerSearchButton.module.scss";
import { Channel } from "../server/model/channel";
import { Event } from "../server/model/event";
import { store } from "../store/store";
import { cloneMap } from "../helper/CloneMap";
import SearchIcon from "./SearchIcon";

interface SideDrawerSearchButtonProps {
  handleSearchClick: React.MouseEventHandler<HTMLDivElement>;
  shouldShowSearchResults: boolean;
  shouldHandleSearchRange: boolean;
  searchResultsSummaryString: string;
  handleSearchRange: any;
}

const SideDrawerSearchButton: React.FC<SideDrawerSearchButtonProps> = (
  props
) => {
  const dispatch = useDispatch();
  const eventsCount: Map<number, number> = store.getState().eventCountReducer;
  const eventMap: Map<number, Event> = store.getState().eventMapReducer;

  const eventArr: Event[] = [];
  const copyOfEventMap = cloneMap(eventMap);
  const copyOfCountMap = cloneMap(eventsCount);

  console.log("rerender sidedrawer search button");

  const handleClickSearch = async (e: any) => {
    props.handleSearchClick(e);
    if (props.shouldHandleSearchRange) {
      const filteredData = await props.handleSearchRange();
      for (const eventObj of filteredData) {
        eventArr.push(eventObj);
      }

      dispatch({
        type: "SET_EVENT",
        payload: eventArr,
      });
    }
  };

  return (
    <div
      onClick={
        props.searchResultsSummaryString.length === 0 ? null : handleClickSearch
      }
      className={
        props.searchResultsSummaryString.length === 0
          ? `${sideDrawerSearchButtonClass.searchButtonSidedrawerInactive}`
          : `${sideDrawerSearchButtonClass.searchButtonSidedrawer}`
      }
    >
      <div
        className={sideDrawerSearchButtonClass.searchButtonSidedrawerContents}
      >
        <SearchIcon />
        <div>SEARCH</div>
      </div>
      <div className={sideDrawerSearchButtonClass.searchButtonSidedrawerTitle}>
        {props.searchResultsSummaryString}
      </div>
    </div>
  );
};

export default SideDrawerSearchButton;
