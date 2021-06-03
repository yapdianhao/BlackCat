import React, { useState, useRef } from "react";

import replyBarClass from "../styles/ReplyBar.module.scss";
import SendIcon from "./SendIcon";
import CrossIcon from "./CrossIcon";

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
    <div className={replyBarClass.replyBar}>
      <div className={replyBarClass.replyTextArea}>
        <div className={replyBarClass.replyCancelIcon}>
          <CrossIcon handleClickCancel={props.handleClickCancelIcon} />
        </div>
        <input
          placeholder={props.placeHolder}
          onChange={(e) => setCommentInput(e.target.value)}
          ref={textInput}
        />
      </div>
      <div className={replyBarClass.replySendButtonArea} onClick={clearInput}>
        <SendIcon handleSendComment={sendComment} />
      </div>
    </div>
  );
};

export default ReplyBar;
