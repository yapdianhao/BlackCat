import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import "../styles/FilterButtons.scss";
import { store } from "../store/store";
import { Event } from "../server/model/event";
import { cloneMap } from "../helper/CloneMap";

interface FilterButtonProp {
  buttonStates?: [boolean, React.Dispatch<React.SetStateAction<boolean>>][];
  allButtonFunctions?: any[];
  buttonText: string;
  key?: number;
  idx?: number;
  type: string;
  handleClick: Function;
}

const FilterButton: React.FC<FilterButtonProp> = (props) => {
  const [isActive, toggleActive] =
    props.buttonStates[props.idx] === undefined
      ? useState(false)
      : props.buttonStates[props.idx];

  const dispatch = useDispatch();
  const eventsCount: Map<number, number> = store.getState().eventCountReducer;
  const eventMap: Map<number, Event> = store.getState().eventMapReducer;

  const handleClick = async () => {
    toggleActive(!isActive);
  };

  const processAfterClick = async () => {
    if (isActive && (props.type === "time" || props.type === "search")) {
      for (let i = 0; i < props.buttonStates.length; i++) {
        if (i === props.idx) continue;
        const [otherButtonActive, setOtherButtonActive] = props.buttonStates[i];
        setOtherButtonActive(false);
      }
    }
    if (props.type === "search") return;
    console.log(props.type);
    const filteredData = await props.handleClick(props.buttonText);
    console.log(`FILTERED DATA ${props.buttonText}`);
    console.log(filteredData);
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
            Math.max(0, copyOfCountMap.get(eventObj.eventId) - 1)
          );
        }
      }
    }

    // for (const eventObj of excludedEvents) {
    //   copyOfCountMap.set(
    //     eventObj.eventId,
    //     Math.max(0, copyOfCountMap.get(eventObj.eventId) - 1)
    //   );
    // }

    // console.log(excludedEvents);

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

  if (props.type === "time" || props.type === "search") {
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
