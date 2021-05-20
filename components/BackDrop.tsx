import React from "react";

import "../styles/BackDrop.scss";

interface BackDropProps {
  backDropClickHandler: React.MouseEventHandler<HTMLDivElement>;
}

const BackDrop: React.FC<BackDropProps> = (props) => {
  return <div className="backdrop" onClick={props.backDropClickHandler} />;
};

export default BackDrop;
