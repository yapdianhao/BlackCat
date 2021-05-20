import React from "react";

import "../styles/SideDrawerToggleButton.scss";
import SearchIcon from "../components/SearchIcon";

interface SideDrawerToggleButtonProps {
  clickHandler: React.MouseEventHandler<HTMLButtonElement>;
}

const SideDrawerToggleButton: React.FC<SideDrawerToggleButtonProps> = (
  props
) => {
  return (
    <button onClick={props.clickHandler}>
      <div className="search-button">
        <SearchIcon />
      </div>
    </button>
  );
};

export default SideDrawerToggleButton;
