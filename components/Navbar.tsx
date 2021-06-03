import React from "react";

import navBarClass from "../styles/Navbar.module.scss";
import SearchIcon from "../components/SearchIcon";
import BlackCatIcon from "../components/BlackCatIcon";

const profilePic = require("../images/Street-Dance-01.jpg");

const NavBar = () => {
  return (
    <div className={navBarClass.navbarArea}>
      <SearchIcon />
      <div className={navBarClass.blackCatIcon}>
        <BlackCatIcon />
      </div>
      <img src={String(profilePic)} className={navBarClass.profilePic} />
    </div>
  );
};

export default NavBar;
