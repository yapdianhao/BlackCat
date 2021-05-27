import React from "react";

interface SendIconProps {
  handleSendComment: any;
}

const SendIcon: React.FC<SendIconProps> = (props) => {
  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      onClick={props.handleSendComment}
    >
      <title>send</title>
      <path d="M2.68,28l28-12L2.68,4v9.33l20,2.67-20,2.67V28Z" />
    </svg>
  );
};

export default SendIcon;
