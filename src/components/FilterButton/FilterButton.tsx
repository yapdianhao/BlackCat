import React, { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";

import filterButtonClass from "./FilterButtons.module.scss";
import { store } from "../../utils/store/store";
import { Event } from "../../../server/model/event";
import { cloneMap } from "../../../src/utils/helper/CloneMap";

interface FilterButtonProp {
  buttonStates?:
    | [boolean, React.Dispatch<React.SetStateAction<boolean>>][]
    | null;
  setMapBool: any | null;
  stateBoolMap: Map<string, boolean> | null;
  allButtonFunctions?: any[];
  buttonText: string;
  key?: number;
  idx?: number;
  type: string;
  handleClick: any;
  setSearchString: any;
}

const mapStateToProps = (state: any) => {
  return {
    eventCount: state.eventCountReducer,
    eventMap: state.eventMapReducer,
  };
};

const FilterButton: React.FC<FilterButtonProp> = (props) => {
  const [isActive, toggleActive] =
    props.buttonStates === null ||
    props.buttonStates.length === 0 ||
    props.buttonStates.length <= props.idx ||
    props.buttonStates[props.idx] === undefined
      ? useState(false)
      : props.buttonStates[props.idx];

  const dispatch = useDispatch();
  const eventsCount: Map<number, number> = store.getState().eventCountReducer;
  const eventMap: Map<number, Event> = store.getState().eventMapReducer;
  const copyOfEventMap = cloneMap(eventMap);
  const copyOfCountMap = cloneMap(eventsCount);

  const handleClick = async () => {
    toggleActive(!isActive);
  };

  const processAfterClick = async () => {
    if (isActive && (props.type === "time" || props.type === "search")) {
      for (let i = 0; i < props.buttonStates.length; i++) {
        if (i === props.idx) continue;
        const [, setOtherButtonActive] = props.buttonStates[i];
        setOtherButtonActive(false);
      }
    }
    if (props.type === "channel") {
      if (isActive) {
        props.setMapBool(props.buttonText, true);
      } else {
        props.setMapBool(props.buttonText, false);
      }
    }
    if (props.type === "search") return;
    const filteredData = await props.handleClick(props.buttonText);
    const eventArr: Event[] = [];

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
    props.setSearchString();
  }, [isActive]);

  if (props.type === "time" || props.type === "search") {
    return (
      <button
        onClick={() => handleClick()}
        className={
          isActive
            ? `${filterButtonClass.filterButtonTimeFocus}`
            : `${filterButtonClass.filterButtonTime}`
        }
      >
        {props.buttonText}
      </button>
    );
  } else {
    return (
      <button
        onClick={() => handleClick()}
        className={
          isActive
            ? `${filterButtonClass.filterButtonChannelFocus}`
            : `${filterButtonClass.filterButtonChannel}`
        }
      >
        {props.buttonText}
      </button>
    );
  }
};

export default connect(mapStateToProps)(FilterButton);
