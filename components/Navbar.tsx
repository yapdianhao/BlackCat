import React from "react";

import "../styles/Navbar.scss";
import SearchIcon from "../components/SearchIcon";
import BlackCatIcon from "../components/BlackCatIcon";

const profilePic = require("../images/Street-Dance-01.jpg");

const NavBar = () => {
  return (
    <div className="navbar-area">
      <SearchIcon />
      <div className="blackcat-icon">
        <BlackCatIcon />
      </div>
      <img src={String(profilePic)} className="profile-pic" />
    </div>
  );
};

export default NavBar;
