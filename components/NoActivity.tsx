import React from "react";

import noActivityClass from "../styles/NoActivity.module.scss";
import NoActivityIcon from "./NoActivityIcon";

const NoActivity = () => {
  return (
    <div className={noActivityClass.noActivity}>
      <NoActivityIcon />
      <div>No activity found</div>
    </div>
  );
};

export default NoActivity;
