import React from "react";

import "../styles/ReactionBar.scss";
import SingleCommentIcon from "./SingleCommentIcon";
import CheckIconOutline from "./CheckIconOutline";
import HeartIconOutline from "./HeartIconOutline";
import CheckIcon from "./CheckIcon";
import HeartIcon from "./HeartIcon";

//handleClickLike={handleUserClicksLike}
// handleClickGoing={handleUserClicksGoing}
// doesUserLike={userLikesThisEvent} i
//sUserGoing={userGoingThisEvent}
interface ReactionBarProps {
  handleClickCommentButton: any;
  handleClickLike: any;
  handleClickGoing: any;
  doesUserLike: boolean;
  isUserGoing: boolean;
}

const ReactionBar: React.FC<ReactionBarProps> = (props) => {
  return (
    <div className="reaction-bar">
      <div className="blue-button">
        <SingleCommentIcon
          handleCommentIconClicked={props.handleClickCommentButton}
        />
      </div>
      <div className="blue-button" onClick={props.handleClickLike}>
        <div className={props.doesUserLike ? "user-likes" : ""}>
          {props.doesUserLike ? <HeartIcon /> : <HeartIconOutline />}
        </div>
      </div>
      <div className="yellow-button" onClick={props.handleClickGoing}>
        <div className={props.isUserGoing ? "user-going" : ""}>
          {props.isUserGoing ? <CheckIcon /> : <CheckIconOutline />}
        </div>
        <div className={props.isUserGoing ? "user-going" : ""}>
          <div>{props.isUserGoing ? "I am going" : "Join"}</div>
        </div>
      </div>
    </div>
  );
};

export default ReactionBar;
