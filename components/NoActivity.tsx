import React from "react";

import "../styles/NoActivity.scss";
import NoActivityIcon from "./NoActivityIcon";

const NoActivity = () => {
  return (
    <div className="no-activity">
      <NoActivityIcon />
      <div>No activity found</div>
    </div>
  );
};

export default NoActivity;
