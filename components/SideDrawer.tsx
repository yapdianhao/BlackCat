import React from "react";

import "../styles/SideDrawer.scss";

interface SideDrawerProps {
  shouldShow: boolean;
}

const SideDrawer: React.FC<SideDrawerProps> = (props) => {
  let drawerClass = props.shouldShow ? "side-drawer open" : "side-drawer";
  return (
    <div className={drawerClass}>
      <div className="date-title">
        Date
        <hr />
      </div>
    </div>
  );
};

export default SideDrawer;
