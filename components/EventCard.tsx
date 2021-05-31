import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

import "../styles/EventCard.scss";
import { monthNames } from "../helper/MonthNames";
const profilePic = require("../images/Street-Dance-01.jpg");
import { Event } from "../server/model/event";
import { User } from "../server/model/user";
import ClockIcon from "../components/ClockIcon";
import HeartIcon from "./HeartIcon";
import CheckIcon from "./CheckIcon";
import HeartIconOutline from "./HeartIconOutline";
import CheckIconOutline from "./CheckIconOutline";

interface EventCardProps {
  eventToRender: Event;
}

const EventCard: React.FC<EventCardProps> = (props) => {
  const history = useHistory();

  const [eventPoster, setEventPoster] = useState<User>();
  const [mainUser, setMainUser] = useState<User>();

  const passedStartDate = new Date(props.eventToRender.eventStartDateTime);
  const passedEndDate = new Date(props.eventToRender.eventEndDateTime);

  const checkIfListContainseventId = (eventsIdList: number[]) => {
    const setFromList = new Set(eventsIdList);
    return setFromList.has(props.eventToRender.eventId);
  };

  const handleClickEventCard = () => {
    history.push(`/events/${props.eventToRender.eventId}`);
  };

  const fetchAuthenticatedUser = async () => {
    await fetch(
      `http://localhost:5000/api/users/${localStorage.getItem(
        "authenticatedUser"
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMainUser(data);
      });
  };

  const fetchEventPoster = async () => {
    await fetch(
      `http://localhost:5000/api/users/${props.eventToRender.eventPostedBy}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEventPoster(data);
      });
  };

  useEffect(() => {
    fetchAuthenticatedUser();
    fetchEventPoster();
  }, []);

  return (
    <div className="card-outline" onClick={handleClickEventCard}>
      <div className="card-header">
        <img
          src={String(eventPoster && eventPoster.userImgUrl)}
          className="profile-pic"
        />
        <div className="user-name">{eventPoster && eventPoster.userName}</div>
        <div className="channel-name">{props.eventToRender.eventChannel}</div>
      </div>
      <div className="activity-title">{props.eventToRender.eventName}</div>
      <div className="activity-time-area">
        <ClockIcon />
        <div className="activity-time">{`${passedStartDate.getDate()} ${
          monthNames[passedStartDate.getMonth()]
        } ${passedStartDate.getFullYear()} ${
          passedStartDate.getHours() < 10
            ? "0" + passedStartDate.getHours()
            : passedStartDate.getHours()
        }:${
          passedStartDate.getMinutes() < 10
            ? "0" + passedStartDate.getMinutes()
            : passedStartDate.getMinutes()
        } - ${passedEndDate.getDate()} ${
          monthNames[passedEndDate.getMonth()]
        } ${passedEndDate.getFullYear()} ${passedEndDate.getHours()}:${passedEndDate.getMinutes()}`}</div>
      </div>
      <div className="activity-desc">
        {props.eventToRender.eventDescription}
      </div>
      <div
        className={`activity-stats-area ${
          props.eventToRender.usersGoingEvent
            .map((user: User) => user.userId)
            .includes(+localStorage.getItem("authenticatedUser"))
            ? "user-going"
            : "user-dont-like"
        }`}
      >
        <div
          className={`${
            props.eventToRender.usersGoingEvent
              .map((user: User) => user.userId)
              .includes(+localStorage.getItem("authenticatedUser"))
              ? "user-going"
              : "user-dont-like"
          }`}
        >
          {props.eventToRender.usersGoingEvent
            .map((user: User) => user.userId)
            .includes(+localStorage.getItem("authenticatedUser")) ? (
            <CheckIcon />
          ) : (
            <CheckIconOutline />
          )}
        </div>
        <div className="stats-desc">I am going</div>
        <div
          className={`${
            props.eventToRender.usersLikeEvent
              .map((user: User) => user.userId)
              .includes(+localStorage.getItem("authenticatedUser"))
              ? "user-likes"
              : "user-dont-like"
          }`}
        >
          {props.eventToRender.usersLikeEvent
            .map((user: User) => user.userId)
            .includes(+localStorage.getItem("authenticatedUser")) ? (
            <HeartIcon />
          ) : (
            <HeartIconOutline />
          )}
        </div>
        <div className="stats-desc">I like it</div>
      </div>
    </div>
  );
};

export default EventCard;
