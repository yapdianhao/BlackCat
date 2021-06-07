import React from "react";

import styles from "./LaterSearchTool.module.scss";
import DateFromIcon from "../DateFromIcon/DateFromIcon";
import DateToIcon from "../DateToIcon/DateToIcon";

interface LaterSearchToolProps {
  firstListener: any;
  secondListener: any;
  setSearchResultSummary: any;
}

const LaterSearchTool: React.FC<LaterSearchToolProps> = (props) => {
  const handleFirstDateChange = (e: any) => {
    props.firstListener(e);
    props.setSearchResultSummary();
  };

  const handleSecondDateChange = (e: any) => {
    props.secondListener(e);
    props.setSearchResultSummary();
  };

  return (
    <div className={styles.laterSearch}>
      <div className={styles.triangle} />
      <div className={styles.inputArea}>
        <div className={styles.inputSearchRow}>
          <div className={styles.inputSearchBox}>
            <DateFromIcon />
            <input
              type="date"
              onChange={(e) => e && handleFirstDateChange(e.target.value)}
            ></input>
          </div>
          <div className={styles.inputSearchBox}> - </div>
          <div className={styles.inputSearchBox}>
            <DateToIcon />
            <input
              type="date"
              onChange={(e) => e && handleSecondDateChange(e.target.value)}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaterSearchTool;
