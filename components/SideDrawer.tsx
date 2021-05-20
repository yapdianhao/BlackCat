import React from "react";

import "../styles/SideDrawer.scss";
import FilterButton from "../components/FilterButton";

interface SideDrawerProps {
  shouldShow: boolean;
}

const SideDrawer: React.FC<SideDrawerProps> = (props) => {
  // css style to render drawer
  let drawerClass = props.shouldShow ? "side-drawer open" : "side-drawer";

  // filterkeywords, map each into button later
  const dateFilterKeyWords = [
    "ANYTIME",
    "TODAY",
    "TOMORROW",
    "THIS WEEK",
    "THIS MONTH",
    "LATER",
  ];

  return (
    <div className={drawerClass}>
      <div className="date-title">
        <div>DATE</div>
      </div>
      <div className="filter-button-area">
        {dateFilterKeyWords.map((keyword, index) => (
          <FilterButton buttonText={keyword} key={keyword} />
        ))}
      </div>
      <div className="date-title">
        <div>CHANNEL</div>
      </div>
    </div>
  );
};

export default SideDrawer;
