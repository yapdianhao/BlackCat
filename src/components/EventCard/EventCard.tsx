import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";

import styles from "./EventCard.module.scss";
import { monthNames } from "../../../src/utils/helper/MonthNames";
import { Event } from "../../../server/model/event";
import { User } from "../../../server/model/user";
import ClockIcon from "../ClockIcon/ClockIcon";
import HeartIcon from "../HeartIcon/HeartIcon";
import CheckIcon from "../CheckIcon/CheckIcon";
import HeartIconOutline from "../HeartIconOutline/HeartIconOutline";
import CheckIconOutline from "../CheckIconOutline/CheckIconOutline";

interface EventCardProps {
  eventToRender: Event;
}

const EventCard: React.FC<EventCardProps> = (props) => {
  const history = useHistory();

  const [eventPoster, setEventPoster] = useState<User>();
  const [, setMainUser] = useState<User>();

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
        setEventPoster(data);
      });
  };

  useEffect(() => {
    fetchAuthenticatedUser();
    fetchEventPoster();
  }, []);

  return (
    <div className={styles.cardOutline} onClick={handleClickEventCard}>
      <div className={styles.cardHeader}>
        <img
          src={String(eventPoster && eventPoster.userImgUrl)}
          className={styles.profilePic}
        />
        <div className={styles.userName}>
          {eventPoster && eventPoster.userName}
        </div>
        <div className={styles.channelName}>
          {props.eventToRender.eventChannel}
        </div>
      </div>
      <div className={styles.activityTitle}>
        {props.eventToRender.eventName}
      </div>
      <div className={styles.activityTimeArea}>
        <ClockIcon />
        <div className={styles.activityTime}>{`${passedStartDate.getDate()} ${
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
      <div className={styles.activityDesc}>
        {props.eventToRender.eventDescription}
      </div>
      <div
        className={`${styles.activityStatsArea} ${
          props.eventToRender.usersGoingEvent
            .map((user: User) => user.userId)
            .includes(+localStorage.getItem("authenticatedUser"))
            ? `${styles.userGoing}`
            : `${styles.userDontLike}`
        }`}
      >
        <div
          className={`${
            props.eventToRender.usersGoingEvent
              .map((user: User) => user.userId)
              .includes(+localStorage.getItem("authenticatedUser"))
              ? `${styles.userGoing}`
              : `${styles.userDontLike}`
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
        <div className={styles.statsDesc}>I am going</div>
        <div
          className={`${
            props.eventToRender.usersLikeEvent
              .map((user: User) => user.userId)
              .includes(+localStorage.getItem("authenticatedUser"))
              ? `${styles.userLikes}`
              : `${styles.userDontLike}`
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
        <div className={styles.statsDesc}>I like it</div>
      </div>
    </div>
  );
};

export default EventCard;
