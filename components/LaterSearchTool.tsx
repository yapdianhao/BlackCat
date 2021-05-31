import React, { useState } from "react";

import "../styles/LaterSearchTool.scss";

import DateFromIcon from "./DateFromIcon";
import DateToIcon from "./DateToIcon";

interface LaterSearchToolProps {
  firstListener: any;
  secondListener: any;
}

const LaterSearchTool: React.FC<LaterSearchToolProps> = (props) => {
  console.log(props.secondListener);

  return (
    <div className="later-search">
      <div className="triangle" />
      <div className="input-area">
        <div className="input-search-row">
          <div className="input-search-box">
            <DateFromIcon />
            <input
              placeholder="MM-DD-YYYY"
              onChange={(e) => props.firstListener(e.target.value)}
            ></input>
          </div>
          <div className="input-search-box"> - </div>
          <div className="input-search-box">
            <DateToIcon />
            <input
              placeholder="MM-DD-YYYY"
              onChange={(e) => props.secondListener(e.target.value)}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaterSearchTool;
