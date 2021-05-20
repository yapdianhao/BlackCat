import React, { useState } from "react";

import "../styles/FilterButtons.scss";

interface FilterButtonProp {
  buttonText: string;
  key: string;
}

const FilterButton: React.FC<FilterButtonProp> = (props) => {
  const [isActive, toggleActive] = useState(false);

  const handleClick = () => {
    toggleActive(!isActive);
  };

  return (
    <button
      onClick={() => handleClick()}
      className={isActive ? "filter-button-focus" : "filter-button"}
    >
      {props.buttonText}
    </button>
  );
};

export default FilterButton;
