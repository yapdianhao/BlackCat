import { profile } from "console";
import React from "react";

import "../styles/EventCard.scss";
const profilePic = require("../images/Street-Dance-01.jpg");
import { Event } from "../server/model/event";
import ClockIcon from "../components/ClockIcon";
import HeartIcon from "./HeartIcon";
import CheckIcon from "./CheckIcon";
import HeartIconOutline from "./HeartIconOutline";
import CheckIconOutline from "./CheckIconOutline";

interface EventCardProps {
  eventToRender: Event;
}

const EventCard: React.FC<EventCardProps> = (props) => {
  return (
    <div className="card-outline">
      <div className="card-header">
        <img src={String(profilePic)} className="profile-pic" />
        <div className="user-name">Username</div>
        <div className="channel-name">Channel name</div>
      </div>
      <div className="activity-title">
        This is a very long title, may be more than one line.
      </div>
      <div className="activity-time-area">
        <ClockIcon />
        <div className="activity-time">
          14 May 2016 22:30 - 14 May 2016 23:00
        </div>
      </div>
      <div className="activity-desc">
        Morbi a metus. Phasellus enim erat, vestibulum vel, aliquam a, posuere
        eu, velit. Nullam sapien sem, ornare ac, nonummy non, lobortis a, enim.
        Nunc tincidunt ante vitae massa. Duis ante orci, molestie vitae,
        vehicula venenatis, tincidunt ac, pede. Nulla accumsan, elit sit
      </div>
      <div className="activity-stats-area">
        <CheckIcon />
        <div className="stats-desc">I am going</div>
        <HeartIcon />
        <div className="stats-desc">I like it</div>
      </div>
    </div>
  );
};

export default EventCard;
