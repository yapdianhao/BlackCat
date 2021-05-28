import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import "../styles/FilterButtons.scss";
import { store } from "../store/store";
import { Event } from "../server/model/event";

interface FilterButtonProp {
  buttonText: string;
  key: number;
  type: string;
  handleClick: Function;
}

const FilterButton: React.FC<FilterButtonProp> = (props) => {
  const [isActive, toggleActive] = useState(false);

  const dispatch = useDispatch();
  const renderingEvents = store.getState().eventsReducer;
  const eventsCount: Map<number, number> = store.getState().eventCountReducer;
  const eventMap: Map<number, Event> = store.getState().eventMapReducer;

  const cloneMap = (inputMap: Map<number, number | Event>) => {
    const cloned = new Map();
    for (const k of inputMap.keys()) {
      cloned.set(k, inputMap.get(k));
    }
    return cloned;
  };

  const handleClick = async () => {
    toggleActive(!isActive);
    // const filteredData = await props.handleClick(props.buttonText);
    // const eventArr: Event[] = [];
    // const copyOfEventMap = cloneMap(eventMap);
    // const copyOfCountMap = cloneMap(eventsCount);

    // // append new event to id-event-map.
    // for (const eventObj of filteredData) {
    //   if (!copyOfEventMap.has(eventObj.eventId)) {
    //     copyOfEventMap.set(eventObj.eventId, eventObj);
    //   }
    //   if (!copyOfCountMap.has(eventObj.eventId)) {
    //     if (isActive) copyOfCountMap.set(eventObj.eventId, 1);
    //     else copyOfCountMap.set(eventObj.eventId, 0);
    //   } else {
    //     if (isActive) {
    //       copyOfCountMap.set(
    //         eventObj.eventId,
    //         copyOfCountMap.get(eventObj.eventId) + 1
    //       );
    //     } else {
    //       copyOfCountMap.set(
    //         eventObj.eventId,
    //         copyOfCountMap.get(eventObj.eventId) - 1
    //       );
    //     }
    //   }
    // }

    // for (const eventId of copyOfCountMap.keys()) {
    //   if (copyOfCountMap.get(eventId) > 0) {
    //     eventArr.push(copyOfEventMap.get(eventId));
    //   }
    // }

    // dispatch({
    //   type: "SET_EVENT",
    //   payload: eventArr,
    // });

    // dispatch({
    //   type: "SET_EVENT_MAP",
    //   payload: copyOfEventMap,
    // });

    // dispatch({
    //   type: "SET_EVENT_COUNT",
    //   payload: copyOfCountMap,
    // });

    // console.log(copyOfCountMap);
    // console.log(copyOfEventMap);
    // console.log(filteredData);
    // console.log(isActive);
  };

  const processAfterClick = async () => {
    const filteredData = await props.handleClick(props.buttonText);
    const eventArr: Event[] = [];
    const copyOfEventMap = cloneMap(eventMap);
    const copyOfCountMap = cloneMap(eventsCount);

    // append new event to id-event-map.
    for (const eventObj of filteredData) {
      if (!copyOfEventMap.has(eventObj.eventId)) {
        copyOfEventMap.set(eventObj.eventId, eventObj);
      }
      if (!copyOfCountMap.has(eventObj.eventId)) {
        if (isActive) copyOfCountMap.set(eventObj.eventId, 1);
      } else {
        if (isActive) {
          copyOfCountMap.set(
            eventObj.eventId,
            copyOfCountMap.get(eventObj.eventId) + 1
          );
        } else {
          copyOfCountMap.set(
            eventObj.eventId,
            copyOfCountMap.get(eventObj.eventId) - 1
          );
        }
      }
    }

    for (const eventId of copyOfCountMap.keys()) {
      if (copyOfCountMap.get(eventId) > 0) {
        eventArr.push(copyOfEventMap.get(eventId));
      }
    }

    dispatch({
      type: "SET_EVENT",
      payload: eventArr,
    });

    dispatch({
      type: "SET_EVENT_MAP",
      payload: copyOfEventMap,
    });

    dispatch({
      type: "SET_EVENT_COUNT",
      payload: copyOfCountMap,
    });
  };

  useEffect(() => {
    processAfterClick();
  }, [isActive]);

  if (props.type === "time") {
    return (
      <button
        onClick={() => handleClick()}
        className={isActive ? "filter-button-time-focus" : "filter-button-time"}
      >
        {props.buttonText}
      </button>
    );
  } else {
    return (
      <button
        onClick={() => handleClick()}
        className={
          isActive ? "filter-button-channel-focus" : "filter-button-channel"
        }
      >
        {props.buttonText}
      </button>
    );
  }
};

export default FilterButton;
