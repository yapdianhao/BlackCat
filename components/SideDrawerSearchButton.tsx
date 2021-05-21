import React from "react";

import "../styles/SideDrawerSearchButton.scss";
import SearchIcon from "./SearchIcon";

const SideDrawerSearchButton = () => {
  return (
    <div className="search-button-sidedrawer">
      <div className="search-button-sidedrawer-contents">
        <SearchIcon />
        <div>SEARCH</div>
      </div>
      <div className="search-button-sidedrawer-title">All activities</div>
    </div>
  );
};

export default SideDrawerSearchButton;
