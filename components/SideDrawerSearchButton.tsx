import React from "react";

import "../styles/SideDrawerSearchButton.scss";
import SearchIcon from "./SearchIcon";

interface SideDrawerSearchButtonProps {
  handleSearchClick: React.MouseEventHandler<HTMLDivElement>;
  shouldShowSearchResults: boolean;
}

const SideDrawerSearchButton: React.FC<SideDrawerSearchButtonProps> = (
  props
) => {
  return (
    <div onClick={props.handleSearchClick} className="search-button-sidedrawer">
      <div className="search-button-sidedrawer-contents">
        <SearchIcon />
        <div>SEARCH</div>
      </div>
      <div className="search-button-sidedrawer-title">All activities</div>
    </div>
  );
};

export default SideDrawerSearchButton;
