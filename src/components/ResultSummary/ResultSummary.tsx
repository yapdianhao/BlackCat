import React from "react";

import styles from "./ResultSummary.module.scss";
interface ResultSummaryProps {
  summaryCount: number;
  clearSearchResults: React.MouseEventHandler<HTMLDivElement>;
  searchResultSummaryString: string;
}

const ResultSummary: React.FC<ResultSummaryProps> = (props) => {
  return (
    <div className={styles.resultSummary}>
      <div className={styles.resultFirstRow}>
        <div
          className={styles.resultWords}
        >{`${props.summaryCount} Results`}</div>
        <div className={styles.resultButton} onClick={props.clearSearchResults}>
          CLEAR SEARCH
        </div>
      </div>
      <div className={styles.resultSecRow}>
        Searched for {props.searchResultSummaryString}
      </div>
    </div>
  );
};

export default ResultSummary;
