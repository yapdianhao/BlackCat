import React, { useState, useEffect } from "react";

import { User } from "../../../server/model/user";
import { Event } from "../../../server/model/event";

import styles from "./ProfileScreen.module.scss";
import EventCard from "../EventCard/EventCard";
import EventDetailsToolBar from "../EventDetailsToolBar/EventDetailsToolBar";
import EmailIcon from "../EmailIcon/EmailIcon";
import NoActivity from "../NoActivity/NoActivity";
import HeartIconOutline from "../HeartIconOutline/HeartIconOutline";
import CheckIconOutline from "../CheckIconOutline/CheckIconOutline";
import PastIconOutline from "../PastIconOutline/PastIconOutline";
import HeartIcon from "../HeartIcon/HeartIcon";
import CheckIcon from "../CheckIcon/CheckIcon";
import PastIcon from "../PastIcon/PastIcon";

const ProfileScreen = (): JSX.Element => {
  const [mainUser, setMainUser] = useState<User>();
  const [eventsUserLikes, setEventsUserLikes] = useState<Event[]>([]);
  const [eventsUserGoing, setEventsUserGoing] = useState<Event[]>([]);
  const [eventsPast, setEventsPast] = useState<Event[]>([]);
  const [likesTapped, setLikesTapped] = useState(true);
  const [goingTapped, setGoingTapped] = useState(false);
  const [pastTapped, setPassedTapped] = useState(false);

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

  const fetchUserLikeEvents = async () => {
    await fetch("http://localhost:5000/api/events")
      .then((response) => response.json())
      .then((data) => {
        data = data.filter((event: Event) => {
          return event.usersLikeEvent
            .map((user: User) => user.userId)
            .includes(+localStorage.getItem("authenticatedUser"));
        });
        setEventsUserLikes(data);
      });
  };

  const fetchUserGoingEvents = async () => {
    await fetch("http://localhost:5000/api/events")
      .then((response) => response.json())
      .then((data) => {
        data = data.filter((event: Event) => {
          return event.usersGoingEvent
            .map((user: User) => user.userId)
            .includes(+localStorage.getItem("authenticatedUser"));
        });
        setEventsUserGoing(data);
      });
  };

  const fetchEventsPast = async () => {
    await fetch("http://localhost:5000/api/events")
      .then((response) => response.json())
      .then((data) => {
        data = data.filter((event: Event) => {
          return new Date(event.eventStartDateTime) < new Date();
        });
        setEventsPast(data);
      });
  };

  const handleClickLikesTab = () => {
    setLikesTapped(true);
    setGoingTapped(false);
    setPassedTapped(false);
  };

  const handleClickGoingTab = () => {
    setGoingTapped(true);
    setLikesTapped(false);
    setPassedTapped(false);
  };

  const handleClickPassedTab = () => {
    setPassedTapped(true);
    setGoingTapped(false);
    setLikesTapped(false);
  };

  useEffect(() => {
    fetchAuthenticatedUser();
    fetchUserGoingEvents();
    fetchUserLikeEvents();
    fetchEventsPast();
  }, []);

  return (
    <div>
      <EventDetailsToolBar />
      <div className={styles.profilePictureArea}>
        <img src={mainUser && mainUser.userImgUrl} />
      </div>
      <div className={styles.profileName}>{mainUser && mainUser.userName}</div>
      <div className={styles.emailArea}>
        <EmailIcon />
        {mainUser && mainUser.userEmail}
      </div>
      <div className={styles.profileContent}>
        <hr className={styles.divider} />
        <div className={styles.profileStats}>
          <div
            className={`${styles.individualStats} ${
              likesTapped ? `${styles.chosen}` : `${styles.notChosen}`
            }`}
            onClick={handleClickLikesTab}
          >
            {likesTapped ? <HeartIcon /> : <HeartIconOutline />}
            {eventsUserLikes.length} Likes
          </div>
          <div
            className={`${styles.individualStats} ${
              goingTapped ? `${styles.chosen}` : `${styles.notChosen}`
            }`}
            onClick={handleClickGoingTab}
          >
            {goingTapped ? <CheckIcon /> : <CheckIconOutline />}
            {eventsUserGoing.length} Going
          </div>
          <div
            className={`${styles.individualStats} ${
              pastTapped ? `${styles.chosen}` : `${styles.notChosen}`
            }`}
            onClick={handleClickPassedTab}
          >
            {pastTapped ? <PastIcon /> : <PastIconOutline />}
            {eventsPast.length} Past
          </div>
        </div>
        <div className={styles.renderingArea}>
          <hr className={styles.divider} />
          {likesTapped ? (
            eventsUserLikes.length > 0 ? (
              eventsUserLikes.map((event: Event, index: number) => (
                <div key={index}>
                  <EventCard eventToRender={event} />
                  <hr className={styles.divider} />
                </div>
              ))
            ) : (
              <div className={styles.noActivity}>
                <NoActivity />
              </div>
            )
          ) : goingTapped ? (
            eventsUserGoing.length > 0 ? (
              eventsUserGoing.map((event: Event, index: number) => (
                <div key={index}>
                  <EventCard eventToRender={event} />
                  <hr />
                </div>
              ))
            ) : (
              <div className={styles.noActivity}>
                <NoActivity />
              </div>
            )
          ) : eventsPast.length > 0 ? (
            eventsPast.map((event: Event, index: number) => (
              <div key={index}>
                <EventCard eventToRender={event} />
                <hr />
              </div>
            ))
          ) : (
            <div className={styles.noActivity}>
              <NoActivity />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
