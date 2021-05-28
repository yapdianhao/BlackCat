import React from "react";

import "../styles/ResultSummary.scss";

interface ResultSummaryProps {
  summaryCount: number;
  clearSearchResults: React.MouseEventHandler<HTMLDivElement>;
}

const ResultSummary: React.FC<ResultSummaryProps> = (props) => {
  return (
    <div className="result-summary">
      <div className="result-first-row">
        <div className="result-words">{`${props.summaryCount} Results`}</div>
        <div className="result-button" onClick={props.clearSearchResults}>
          CLEAR SEARCH
        </div>
      </div>
      <div className="result-sec-row">Searched for activities on 09/05</div>
    </div>
  );
};

export default ResultSummary;
