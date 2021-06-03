import React from "react";
import { useHistory } from "react-router";

import "../styles/ToolBarHomeButton.scss";
import toolBarHomeButtonClass from "../styles/ToolBarHomeButton.module.scss";
import HomeIcon from "../components/HomeIcon";

const ToolBarHomeButton = () => {
  const history = useHistory();
  return (
    <button onClick={() => history.push("/home")}>
      <div className={toolBarHomeButtonClass.homeButton}>
        <HomeIcon />
      </div>
    </button>
  );
};

export default ToolBarHomeButton;
