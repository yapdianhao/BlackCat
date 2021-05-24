import React from "react";

import "../styles/EventDetailsToolBar.scss";
import ToolBarHomeButton from "./ToolBarHomeButton";
import BlackCatIcon from "../components/BlackCatIcon";

const profilePic = require("../images/Street-Dance-01.jpg");

const EventDetailsToolBar = () => {
  return (
    <header className="toolbar">
      <nav className="toolbar-navigation">
        <div>
          <ToolBarHomeButton />
        </div>
        <div className="toolbar-logo">
          <a href="/">
            <BlackCatIcon />
          </a>
        </div>
        <div>
          <img src={String(profilePic)} className="profile-pic" />
        </div>
      </nav>
    </header>
  );
};

export default EventDetailsToolBar;
