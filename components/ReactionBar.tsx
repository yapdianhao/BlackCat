import React from "react";

import "../styles/ReactionBar.scss";
import SingleCommentIcon from "./SingleCommentIcon";
import CheckIconOutline from "./CheckIconOutline";
import HeartIconOutline from "./HeartIconOutline";
import CheckIcon from "./CheckIcon";
import HeartIcon from "./HeartIcon";

interface ReactionBarProps {
  handleClickCommentButton: any;
}

const ReactionBar: React.FC<ReactionBarProps> = (props) => {
  return (
    <div className="reaction-bar">
      <div className="blue-button">
        <SingleCommentIcon
          handleCommentIconClicked={props.handleClickCommentButton}
        />
      </div>
      <div className="blue-button">
        <HeartIcon />
      </div>
      <div className="yellow-button">
        <CheckIconOutline />
        <div>Going</div>
      </div>
    </div>
  );
};

export default ReactionBar;
