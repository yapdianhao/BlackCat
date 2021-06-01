/* eslint-disable react/prop-types */
import React from "react";

import "../styles/BackDrop.scss";

interface BackDropProps {
  backDropClickHandler: React.MouseEventHandler<HTMLDivElement>;
}

const BackDrop: React.FC<BackDropProps> = (props): JSX.Element => {
  return <div className="backdrop" onClick={props.backDropClickHandler} />;
};

export default BackDrop;
