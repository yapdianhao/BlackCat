import React, { useState, useRef } from "react";

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

  const textInput = useRef(null);

  const sendComment = (e: React.FormEvent<HTMLInputElement>) => {
    props.handleSendIcon(
      `${
        props.placeHolder.slice(0, 1) === "@" ? props.placeHolder : ""
      } ${commentInput}`
    );
  };

  const clearInput = () => {
    textInput.current.value = "";
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
          ref={textInput}
        />
      </div>
      <div className="reply-send-button-area" onClick={clearInput}>
        <SendIcon handleSendComment={sendComment} />
      </div>
    </div>
  );
};

export default ReplyBar;
