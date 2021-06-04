import React from "react";

import styles from "./SideDrawerToggleButton.module.scss";
import SearchIcon from "../SearchIcon/SearchIcon";

interface SideDrawerToggleButtonProps {
  clickHandler: React.MouseEventHandler<HTMLButtonElement>;
}

const SideDrawerToggleButton: React.FC<SideDrawerToggleButtonProps> = (
  props
) => {
  return (
    <button onClick={props.clickHandler}>
      <div className={styles.searchButton}>
        <SearchIcon />
      </div>
    </button>
  );
};

export default SideDrawerToggleButton;
