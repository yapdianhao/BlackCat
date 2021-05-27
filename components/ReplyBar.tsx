import React from "react";

import "../styles/ReplyBar.scss";
import SendIcon from "./SendIcon";
import CrossIcon from "./CrossIcon";

interface ReplyBarProps {
  handleClickCancelIcon: any;
}

const ReplyBar: React.FC<ReplyBarProps> = (props) => {
  return (
    <div className="reply-bar">
      <div className="reply-text-area">
        <div className="reply-cancel-icon">
          <CrossIcon handleClickCancel={props.handleClickCancelIcon} />
        </div>
        <input placeholder="Leave your comment here" />
      </div>
      <div className="reply-send-button-area">
        <SendIcon />
      </div>
    </div>
  );
};

export default ReplyBar;
