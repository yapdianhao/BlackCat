import React from "react";
import { useHistory } from "react-router";

import "../styles/ToolBarHomeButton.scss";
import HomeIcon from "../components/HomeIcon";

const ToolBarHomeButton = () => {
  const history = useHistory();
  return (
    <button onClick={() => history.push("/")}>
      <div className="home-button">
        <HomeIcon />
      </div>
    </button>
  );
};

export default ToolBarHomeButton;
