import React from "react";

import "../styles/Toolbar.scss";
import BlackCatIcon from "../components/BlackCatIcon";
import SideDrawerToggleButton from "./SideDrawerToggleButton";

const profilePic = require("../images/Street-Dance-01.jpg");

interface ToolBarProps {
  drawerClickHandler: React.MouseEventHandler<HTMLButtonElement>;
}

const Toolbar: React.FC<ToolBarProps> = (props) => {
  return (
    <header className="toolbar">
      <nav className="toolbar-navigation">
        <div>
          <SideDrawerToggleButton clickHandler={props.drawerClickHandler} />
        </div>
        <div className="toolbar-logo">
          <BlackCatIcon />
        </div>
        <div>
          <img src={String(profilePic)} className="profile-pic" />
        </div>
      </nav>
    </header>
  );
};

export default Toolbar;
