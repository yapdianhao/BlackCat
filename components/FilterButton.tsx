import React, { useState } from "react";

import "../styles/FilterButtons.scss";

interface FilterButtonProp {
  buttonText: string;
  key: string;
  type: string;
}

const FilterButton: React.FC<FilterButtonProp> = (props) => {
  const [isActive, toggleActive] = useState(false);

  const handleClick = () => {
    toggleActive(!isActive);
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
