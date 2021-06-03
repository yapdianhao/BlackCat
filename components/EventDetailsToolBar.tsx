import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

import eventDetailsToolBarClass from "../styles/EventDetailsToolBar.module.scss";
import { User } from "../server/model/user";
import ToolBarHomeButton from "./ToolBarHomeButton";
import BlackCatIcon from "../components/BlackCatIcon";

const EventDetailsToolBar = () => {
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
    <header className={eventDetailsToolBarClass.toolbar}>
      <nav className={eventDetailsToolBarClass.toolbarNavigation}>
        <div>
          <ToolBarHomeButton />
        </div>
        <div className={eventDetailsToolBarClass.toolbarLogo}>
          <button onClick={() => history.push("/home")}>
            <BlackCatIcon />
          </button>
        </div>
        <div>
          <button onClick={() => history.push("/about")}>
            <img
              src={mainUser && mainUser.userImgUrl}
              className={eventDetailsToolBarClass.profilePic}
            />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default EventDetailsToolBar;
