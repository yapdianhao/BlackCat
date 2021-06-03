import React from "react";

import resultSummaryClass from "../styles/ResultSummary.module.scss";
interface ResultSummaryProps {
  summaryCount: number;
  clearSearchResults: React.MouseEventHandler<HTMLDivElement>;
}

const ResultSummary: React.FC<ResultSummaryProps> = (props) => {
  return (
    <div className={resultSummaryClass.resultSummary}>
      <div className={resultSummaryClass.resultFirstRow}>
        <div
          className={resultSummaryClass.resultWords}
        >{`${props.summaryCount} Results`}</div>
        <div
          className={resultSummaryClass.resultButton}
          onClick={props.clearSearchResults}
        >
          CLEAR SEARCH
        </div>
      </div>
      <div className={resultSummaryClass.resultSecRow}>
        Searched for activities
      </div>
    </div>
  );
};

export default ResultSummary;
