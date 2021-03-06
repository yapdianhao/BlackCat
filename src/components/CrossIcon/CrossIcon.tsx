import React from "react";

interface CrossIconProps {
  handleClickCancel: any;
}

const CrossIcon: React.FC<CrossIconProps> = (props): JSX.Element => {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      onClick={props.handleClickCancel}
    >
      <title>cross</title>
      <polygon points="30 5.33 27.17 2.5 16 13.67 4.83 2.5 2 5.33 13.17 16.5 2 27.67 4.83 30.5 16 19.33 27.17 30.5 30 27.67 18.83 16.5 30 5.33" />
    </svg>
  );
};

export default CrossIcon;
