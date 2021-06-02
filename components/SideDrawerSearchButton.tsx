import React from "react";
import { useDispatch } from "react-redux";

import "../styles/SideDrawerSearchButton.scss";
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
    <div onClick={handleClickSearch} className="search-button-sidedrawer">
      <div className="search-button-sidedrawer-contents">
        <SearchIcon />
        <div>SEARCH</div>
      </div>
      <div className="search-button-sidedrawer-title">
        {props.searchResultsSummaryString}
      </div>
    </div>
  );
};

export default SideDrawerSearchButton;
