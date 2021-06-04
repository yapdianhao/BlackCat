import React, { useState, useRef } from "react";

import styles from "./ReplyBar.module.scss";
import SendIcon from "../SendIcon/SendIcon";
import CrossIcon from "../CrossIcon/CrossIcon";

interface ReplyBarProps {
  handleClickCancelIcon: any;
  handleSendIcon: any;
  placeHolder: string;
}

const ReplyBar: React.FC<ReplyBarProps> = (props) => {
  const [commentInput, setCommentInput] = useState("");

  const textInput = useRef(null);

  const sendComment = () => {
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
    <div className={styles.replyBar}>
      <div className={styles.replyTextArea}>
        <div className={styles.replyCancelIcon}>
          <CrossIcon handleClickCancel={props.handleClickCancelIcon} />
        </div>
        <input
          placeholder={props.placeHolder}
          onChange={(e) => setCommentInput(e.target.value)}
          ref={textInput}
        />
      </div>
      <div className={styles.replySendButtonArea} onClick={clearInput}>
        <SendIcon handleSendComment={sendComment} />
      </div>
    </div>
  );
};

export default ReplyBar;
