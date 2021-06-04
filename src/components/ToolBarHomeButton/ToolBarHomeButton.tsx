import React from "react";
import { useHistory } from "react-router";

import styles from "./ToolBarHomeButton.module.scss";
import HomeIcon from "../HomeIcon/HomeIcon";

const ToolBarHomeButton = (): JSX.Element => {
  const history = useHistory();
  return (
    <button onClick={() => history.push("/home")}>
      <div className={styles.homeButton}>
        <HomeIcon />
      </div>
    </button>
  );
};

export default ToolBarHomeButton;
