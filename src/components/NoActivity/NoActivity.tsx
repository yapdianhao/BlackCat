import React from "react";

import styles from "./NoActivity.module.scss";
import NoActivityIcon from "../NoActivityIcon/NoActivityIcon";

const NoActivity = (): JSX.Element => {
  return (
    <div className={styles.noActivity}>
      <NoActivityIcon />
      <div>No activity found</div>
    </div>
  );
};

export default NoActivity;
