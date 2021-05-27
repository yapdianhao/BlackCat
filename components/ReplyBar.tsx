import React, { useState } from "react";

import "../styles/ReplyBar.scss";
import { store } from "../store/store";
import SendIcon from "./SendIcon";
import CrossIcon from "./CrossIcon";

interface ReplyBarProps {
  handleClickCancelIcon: any;
}

const ReplyBar: React.FC<ReplyBarProps> = (props) => {
  const [commentInput, setCommentInput] = useState("");

  return (
    <div className="reply-bar">
      <div className="reply-text-area">
        <div className="reply-cancel-icon">
          <CrossIcon handleClickCancel={props.handleClickCancelIcon} />
        </div>
        <input
          placeholder="Leave your comment here"
          onChange={(e) => setCommentInput(e.target.value)}
        />
      </div>
      <div className="reply-send-button-area">
        <SendIcon
          handleSendComment={() => {
            console.log(commentInput);
          }}
        />
      </div>
    </div>
  );
};

export default ReplyBar;
