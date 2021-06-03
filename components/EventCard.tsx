import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

import eventCardClass from "../styles/EventCard.module.scss";
import { monthNames } from "../helper/MonthNames";
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
        // console.log(data);
        setEventPoster(data);
      });
  };

  useEffect(() => {
    fetchAuthenticatedUser();
    fetchEventPoster();
  }, []);

  return (
    <div className={eventCardClass.cardOutline} onClick={handleClickEventCard}>
      <div className={eventCardClass.cardHeader}>
        <img
          src={String(eventPoster && eventPoster.userImgUrl)}
          className={eventCardClass.profilePic}
        />
        <div className={eventCardClass.userName}>
          {eventPoster && eventPoster.userName}
        </div>
        <div className={eventCardClass.channelName}>
          {props.eventToRender.eventChannel}
        </div>
      </div>
      <div className={eventCardClass.activityTitle}>
        {props.eventToRender.eventName}
      </div>
      <div className={eventCardClass.activityTimeArea}>
        <ClockIcon />
        <div
          className={eventCardClass.activityTime}
        >{`${passedStartDate.getDate()} ${
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
        } ${passedEndDate.getFullYear()} ${passedEndDate.getHours()}:${
          passedEndDate.getMinutes() < 10
            ? "0" + passedEndDate.getMinutes()
            : passedEndDate.getMinutes()
        }`}</div>
      </div>
      <div className={eventCardClass.activityDesc}>
        {props.eventToRender.eventDescription}
      </div>
      <div
        className={`${eventCardClass.activityStatsArea} ${
          props.eventToRender.usersGoingEvent
            .map((user: User) => user.userId)
            .includes(+localStorage.getItem("authenticatedUser"))
            ? `${eventCardClass.userGoing}`
            : `${eventCardClass.userDontLike}`
        }`}
      >
        <div
          className={`${
            props.eventToRender.usersGoingEvent
              .map((user: User) => user.userId)
              .includes(+localStorage.getItem("authenticatedUser"))
              ? `${eventCardClass.userGoing}`
              : `${eventCardClass.userDontLike}`
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
        <div className={eventCardClass.statsDesc}>I am going</div>
        <div
          className={`${
            props.eventToRender.usersLikeEvent
              .map((user: User) => user.userId)
              .includes(+localStorage.getItem("authenticatedUser"))
              ? `${eventCardClass.userLikes}`
              : `${eventCardClass.userDontLike}`
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
        <div className={eventCardClass.statsDesc}>I like it</div>
      </div>
    </div>
  );
};

export default EventCard;
