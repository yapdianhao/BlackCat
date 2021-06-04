import React from "react";

import styles from "./ReactionBar.module.scss";
import SingleCommentIcon from "../SingleCommentIcon/SingleCommentIcon";
import CheckIconOutline from "../CheckIconOutline/CheckIconOutline";
import HeartIconOutline from "../HeartIconOutline/HeartIconOutline";
import CheckIcon from "../CheckIcon/CheckIcon";
import HeartIcon from "../HeartIcon/HeartIcon";

interface ReactionBarProps {
  handleClickCommentButton: any;
  handleClickLike: any;
  handleClickGoing: any;
  doesUserLike: boolean;
  isUserGoing: boolean;
}

const ReactionBar: React.FC<ReactionBarProps> = (props) => {
  return (
    <div className={styles.reactionBar}>
      <div className={styles.blueButton}>
        <SingleCommentIcon
          handleCommentIconClicked={props.handleClickCommentButton}
        />
      </div>
      <div className={styles.blueButton} onClick={props.handleClickLike}>
        <div className={props.doesUserLike ? `${styles.userLikes}` : ""}>
          {props.doesUserLike ? <HeartIcon /> : <HeartIconOutline />}
        </div>
      </div>
      <div className={styles.yellowButton} onClick={props.handleClickGoing}>
        <div className={props.isUserGoing ? `${styles.userGoing}` : ""}>
          {props.isUserGoing ? <CheckIcon /> : <CheckIconOutline />}
        </div>
        <div className={props.isUserGoing ? `${styles.userGoing}` : ""}>
          <div>{props.isUserGoing ? "I am going" : "Join"}</div>
        </div>
      </div>
    </div>
  );
};

export default ReactionBar;
