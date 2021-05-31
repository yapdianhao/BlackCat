import React from "react";
import { useDispatch } from "react-redux";

import "../styles/SideDrawerSearchButton.scss";
import { Event } from "../server/model/event";
import { store } from "../store/store";
import { cloneMap } from "../helper/CloneMap";
import SearchIcon from "./SearchIcon";

interface SideDrawerSearchButtonProps {
  handleSearchClick: React.MouseEventHandler<HTMLDivElement>;
  shouldShowSearchResults: boolean;
  shouldHandleSearchRange: boolean;
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
      // for (const eventObj of filteredData) {
      //   if (!copyOfEventMap.has(eventObj.eventId)) {
      //     copyOfEventMap.set(eventObj.eventId, eventObj);
      //   }
      //   if (!copyOfCountMap.has(eventObj.eventId)) {
      //     copyOfCountMap.set(eventObj.eventId, 1);
      //   } else {
      //     copyOfCountMap.set(
      //       eventObj.eventId,
      //       copyOfCountMap.get(eventObj.eventId) + 1
      //     );
      //   }
      // }

      // for (const eventId of copyOfCountMap.keys()) {
      //   if (copyOfCountMap.get(eventId) > 0) {
      //     eventArr.push(copyOfEventMap.get(eventId));
      //   }
      // }

      dispatch({
        type: "SET_EVENT",
        payload: eventArr,
      });

      // dispatch({
      //   type: "SET_EVENT_MAP",
      //   payload: copyOfEventMap,
      // });

      // dispatch({
      //   type: "SET_EVENT_COUNT",
      //   payload: copyOfCountMap,
      // });
    }
  };

  return (
    <div onClick={handleClickSearch} className="search-button-sidedrawer">
      <div className="search-button-sidedrawer-contents">
        <SearchIcon />
        <div>SEARCH</div>
      </div>
      <div className="search-button-sidedrawer-title">All activities</div>
    </div>
  );
};

export default SideDrawerSearchButton;
