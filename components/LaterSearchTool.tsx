import React, { useEffect } from "react";

import laterSearchToolClass from "../styles/LaterSearchTool.module.scss";
import DateFromIcon from "./DateFromIcon";
import DateToIcon from "./DateToIcon";

interface LaterSearchToolProps {
  firstListener: any;
  secondListener: any;
  setSearchResultSummary: any;
}

const LaterSearchTool: React.FC<LaterSearchToolProps> = (props) => {
  console.log(props.secondListener);

  const handleFirstDateChange = (e: any) => {
    props.firstListener(e.target.value);
    props.setSearchResultSummary();
  };

  const handleSecondDateChange = (e: any) => {
    props.secondListener(e.target.value);
    props.setSearchResultSummary();
  };

  return (
    <div className={laterSearchToolClass.laterSearch}>
      <div className={laterSearchToolClass.triangle} />
      <div className={laterSearchToolClass.inputArea}>
        <div className={laterSearchToolClass.inputSearchRow}>
          <div className={laterSearchToolClass.inputSearchBox}>
            <DateFromIcon />
            <input
              type="date"
              onChange={(e) => handleFirstDateChange(e.target.value)}
            ></input>
          </div>
          <div className={laterSearchToolClass.inputSearchBox}> - </div>
          <div className={laterSearchToolClass.inputSearchBox}>
            <DateToIcon />
            <input
              type="date"
              onChange={(e) => handleSecondDateChange(e.target.value)}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaterSearchTool;
