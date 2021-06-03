import React from "react";

import reactionBarClass from "../styles/ReactionBar.module.scss";
import SingleCommentIcon from "./SingleCommentIcon";
import CheckIconOutline from "./CheckIconOutline";
import HeartIconOutline from "./HeartIconOutline";
import CheckIcon from "./CheckIcon";
import HeartIcon from "./HeartIcon";

interface ReactionBarProps {
  handleClickCommentButton: any;
  handleClickLike: any;
  handleClickGoing: any;
  doesUserLike: boolean;
  isUserGoing: boolean;
}

const ReactionBar: React.FC<ReactionBarProps> = (props) => {
  return (
    <div className={reactionBarClass.reactionBar}>
      <div className={reactionBarClass.blueButton}>
        <SingleCommentIcon
          handleCommentIconClicked={props.handleClickCommentButton}
        />
      </div>
      <div
        className={reactionBarClass.blueButton}
        onClick={props.handleClickLike}
      >
        <div
          className={props.doesUserLike ? `${reactionBarClass.userLikes}` : ""}
        >
          {props.doesUserLike ? <HeartIcon /> : <HeartIconOutline />}
        </div>
      </div>
      <div
        className={reactionBarClass.yellowButton}
        onClick={props.handleClickGoing}
      >
        <div
          className={props.isUserGoing ? `${reactionBarClass.userGoing}` : ""}
        >
          {props.isUserGoing ? <CheckIcon /> : <CheckIconOutline />}
        </div>
        <div
          className={props.isUserGoing ? `${reactionBarClass.userGoing}` : ""}
        >
          <div>{props.isUserGoing ? "I am going" : "Join"}</div>
        </div>
      </div>
    </div>
  );
};

export default ReactionBar;
