import React from "react";

import styles from "./LaterSearchTool.module.scss";
import DateFromIcon from "../DateFromIcon/DateFromIcon";
import DateToIcon from "../DateToIcon/DateToIcon";
import { renderDate } from "../../utils/helper/DateHelper";
import { renderMonthNumeric } from "../../utils/helper/DateHelper";

interface LaterSearchToolProps {
  firstListener: any;
  secondListener: any;
  setSearchResultSummary: any;
  searchResultSummary: string;
}

const LaterSearchTool: React.FC<LaterSearchToolProps> = (props) => {
  const handleFirstDateChange = (e: any) => {
    props.firstListener(e);
    let searchString = props.searchResultSummary;
    const startDay = renderDate(new Date(e));
    const startMonth = renderMonthNumeric(new Date(e));
    searchString += `from ${startDay < 10 ? "0" + startDay : startDay} / ${
      startMonth + 1 < 10 ? "0" + (startMonth + 1) : startMonth + 1
    }`;
    props.setSearchResultSummary(searchString);
  };

  const handleSecondDateChange = (e: any) => {
    props.secondListener(e);
    let searchString = props.searchResultSummary;
    const endDay = renderDate(new Date(e));
    const endMonth = renderMonthNumeric(new Date(e));
    searchString += ` to ${endDay < 10 ? "0" + endDay : endDay} / ${
      endMonth + 1 < 10 ? "0" + (endMonth + 1) : endMonth + 1
    }`;
    props.setSearchResultSummary(searchString);
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
