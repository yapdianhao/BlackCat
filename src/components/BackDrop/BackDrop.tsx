/* eslint-disable react/prop-types */
import React from "react";

import styles from "./BackDrop.module.scss";

interface BackDropProps {
  backDropClickHandler: React.MouseEventHandler<HTMLDivElement>;
}

const BackDrop: React.FC<BackDropProps> = (props): JSX.Element => {
  return (
    <div className={styles.backdrop} onClick={props.backDropClickHandler} />
  );
};

export default BackDrop;
