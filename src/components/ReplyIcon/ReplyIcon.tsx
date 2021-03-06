import React from "react";

interface ReplyIconProps {
  handleReplyIconClick: any;
  scrollToBottom: any;
  replyTo: string;
}

const ReplyIcon: React.FC<ReplyIconProps> = (props): JSX.Element => {
  const handleClick = () => {
    props.handleReplyIconClick(props.replyTo);
    props.scrollToBottom();
  };

  return (
    <svg
      id="Layer_1"
      data-name="Layer 1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      onClick={handleClick}
    >
      <title>reply</title>
      <path d="M27.35,15c-2.67-3-6.82-4.74-12-5V5.47a1.35,1.35,0,0,0-.79-1.22,1.4,1.4,0,0,0-1.44.17L1.2,13.85a1.33,1.33,0,0,0,0,2.09l11.88,9.52a1.4,1.4,0,0,0,1.45.18,1.34,1.34,0,0,0,.79-1.22V19.79c12,0.17,12.86,7.54,12.89,7.85a1.28,1.28,0,0,0,1.21,1.22h0.07a1.31,1.31,0,0,0,1.3-1.14C30.8,27.66,31.91,20.15,27.35,15Zm-13.4-2.33c5,0,8.94,1.41,11.32,4.08a12,12,0,0,1,2.54,4.81c-2.23-2.29-6-4.45-13.86-4.45h0a1.38,1.38,0,0,0-1,.39,1.31,1.31,0,0,0-.41,1v3.15L4.25,14.9l8.32-6.62v3A1.36,1.36,0,0,0,13.94,12.66ZM29.49,28.41h0Z" />
    </svg>
  );
};

export default ReplyIcon;
