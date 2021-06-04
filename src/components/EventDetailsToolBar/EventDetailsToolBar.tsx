import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

import styles from "./EventDetailsToolBar.module.scss";
import { User } from "../../../server/model/user";
import ToolBarHomeButton from "../ToolBarHomeButton/ToolBarHomeButton";
import BlackCatIcon from "../BlackCatIcon/BlackCatIcon";

const EventDetailsToolBar = (): JSX.Element => {
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
    <header className={styles.toolbar}>
      <nav className={styles.toolbarNavigation}>
        <div>
          <ToolBarHomeButton />
        </div>
        <div className={styles.toolbarLogo}>
          <button onClick={() => history.push("/home")}>
            <BlackCatIcon />
          </button>
        </div>
        <div>
          <button onClick={() => history.push("/about")}>
            <img
              src={mainUser && mainUser.userImgUrl}
              className={styles.profilePic}
            />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default EventDetailsToolBar;
