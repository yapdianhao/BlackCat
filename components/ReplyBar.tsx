import React, { useState } from "react";

import "../styles/ReplyBar.scss";
import SendIcon from "./SendIcon";
import CrossIcon from "./CrossIcon";
import e from "cors";

interface ReplyBarProps {
  handleClickCancelIcon: any;
  handleSendIcon: any;
  placeHolder: string;
}

const ReplyBar: React.FC<ReplyBarProps> = (props) => {
  const [commentInput, setCommentInput] = useState("");

  const sendComment = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    props.handleSendIcon(commentInput);
    setCommentInput("");
    console.log(commentInput);
  };

  return (
    <div className="reply-bar">
      <div className="reply-text-area">
        <div className="reply-cancel-icon">
          <CrossIcon handleClickCancel={props.handleClickCancelIcon} />
        </div>
        <input
          placeholder={props.placeHolder}
          onChange={(e) => setCommentInput(e.target.value)}
        />
      </div>
      <div className="reply-send-button-area">
        <SendIcon handleSendComment={sendComment} />
      </div>
    </div>
  );
};

export default ReplyBar;
