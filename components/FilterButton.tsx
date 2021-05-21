import React, { useState } from "react";
import { useDispatch } from "react-redux";

import "../styles/FilterButtons.scss";
import { store } from "../store/store";

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

  const handleClick = async () => {
    toggleActive(!isActive);
    const filteredData = await props.handleClick();
    dispatch({
      type: "SET_EVENT",
      payload: Array.from(new Set([...renderingEvents, ...filteredData])),
    });
    console.log(filteredData);
  };

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
