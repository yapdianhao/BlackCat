import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

import "../styles/EventDetailsToolBar.scss";
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
  });

  return (
    <header className="toolbar">
      <nav className="toolbar-navigation">
        <div>
          <ToolBarHomeButton />
        </div>
        <div className="toolbar-logo">
          <button onClick={() => history.push("/home")}>
            <BlackCatIcon />
          </button>
        </div>
        <div>
          <img src={mainUser && mainUser.userImgUrl} className="profile-pic" />
        </div>
      </nav>
    </header>
  );
};

export default EventDetailsToolBar;
