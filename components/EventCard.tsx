import { profile } from "console";
import React from "react";

import "../styles/EventCard.scss";
const profilePic = require("../images/Street-Dance-01.jpg");

const EventCard = () => {
  return (
    <div className="card-outline">
      <div className="card-header">
        <img src={String(profilePic)} className="profile-pic" />
        <div className="channel-name">Channel name</div>
      </div>
      <div className="activity-title">
        This is a very long title, may be more than one line.
      </div>
    </div>
  );
};

export default EventCard;
