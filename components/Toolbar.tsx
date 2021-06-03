import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

import { User } from "../server/model/user";
import "../styles/Toolbar.scss";
import toolBarClass from "../styles/Toolbar.module.scss";
import BlackCatIcon from "../components/BlackCatIcon";
import SideDrawerToggleButton from "./SideDrawerToggleButton";

const profilePic = require("../images/Street-Dance-01.jpg");

interface ToolBarProps {
  drawerClickHandler: React.MouseEventHandler<HTMLButtonElement>;
}

const Toolbar: React.FC<ToolBarProps> = (props) => {
  const history = useHistory();

  const [mainUser, setMainUser] = useState<User>();

  const fetchAuthenticatedUser = async () => {
    await fetch(
      `http://localhost:5000/api/users/${localStorage.getItem(
        "authenticatedUser"
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMainUser(data);
      });
  };

  useEffect(() => {
    fetchAuthenticatedUser();
  }, []);

  return (
    <header className={toolBarClass.toolbar}>
      <nav className={toolBarClass.toolbarNavigation}>
        <div>
          <SideDrawerToggleButton clickHandler={props.drawerClickHandler} />
        </div>
        <div className={toolBarClass.toolbarLogo}>
          <button onClick={() => history.push("/home")}>
            <BlackCatIcon />
          </button>
        </div>
        <div>
          <div onClick={() => history.push("/about")}>
            <img
              src={mainUser && mainUser.userImgUrl}
              className={toolBarClass.profilePic}
            />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Toolbar;
