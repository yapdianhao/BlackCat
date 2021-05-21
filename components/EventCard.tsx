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
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dev",
  ];
  const passedStartDate = new Date(props.eventToRender.eventStartDateTime);
  const passedEndDate = new Date(props.eventToRender.eventEndDateTime);
  return (
    <div className="card-outline">
      <div className="card-header">
        <img src={String(profilePic)} className="profile-pic" />
        <div className="user-name">{props.eventToRender.eventPostedBy}</div>
        <div className="channel-name">{props.eventToRender.eventChannel}</div>
      </div>
      <div className="activity-title">{props.eventToRender.eventName}</div>
      <div className="activity-time-area">
        <ClockIcon />
        <div className="activity-time">{`${passedStartDate.getDate()} ${
          monthNames[passedStartDate.getMonth()]
        } ${passedStartDate.getFullYear()} ${passedStartDate.getHours()}:${passedStartDate.getMinutes()} - ${passedEndDate.getDate()} ${
          monthNames[passedEndDate.getMonth()]
        } ${passedEndDate.getFullYear()} ${passedEndDate.getHours()}:${passedEndDate.getMinutes()}`}</div>
      </div>
      <div className="activity-desc">
        {props.eventToRender.eventDescription}
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
