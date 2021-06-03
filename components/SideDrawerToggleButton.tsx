import React from "react";

import sideDrawerToggleButtonClass from "../styles/SideDrawerToggleButton.module.scss";
import SearchIcon from "../components/SearchIcon";

interface SideDrawerToggleButtonProps {
  clickHandler: React.MouseEventHandler<HTMLButtonElement>;
}

const SideDrawerToggleButton: React.FC<SideDrawerToggleButtonProps> = (
  props
) => {
  return (
    <button onClick={props.clickHandler}>
      <div className={sideDrawerToggleButtonClass.searchButton}>
        <SearchIcon />
      </div>
    </button>
  );
};

export default SideDrawerToggleButton;
