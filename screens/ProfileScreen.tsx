import React, { useState, useEffect } from "react";

import { User } from "../server/model/user";
import { Event } from "../server/model/event";

import profileScreenClass from "../styles/ProfileScreen.module.scss";
import EventCard from "../components/EventCard";
import EventDetailsToolBar from "../components/EventDetailsToolBar";
import EmailIcon from "../components/EmailIcon";
import NoActivity from "../components/NoActivity";
import HeartIconOutline from "../components/HeartIconOutline";
import CheckIconOutline from "../components/CheckIconOutline";
import PastIconOutline from "../components/PastIconOutline";
import HeartIcon from "../components/HeartIcon";
import CheckIcon from "../components/CheckIcon";
import PastIcon from "../components/PastIcon";
import { profile } from "console";

const ProfileScreen = () => {
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

  console.log(eventsUserGoing);
  console.log(eventsUserLikes);
  console.log(eventsPast);

  return (
    <div>
      <EventDetailsToolBar />
      <div className={profileScreenClass.profilePictureArea}>
        <img src={mainUser && mainUser.userImgUrl} />
      </div>
      <div className={profileScreenClass.profileName}>
        {mainUser && mainUser.userName}
      </div>
      <div className={profileScreenClass.emailArea}>
        <EmailIcon />
        {mainUser && mainUser.userEmail}
      </div>
      <div className={profileScreenClass.profileContent}>
        <hr className={profileScreenClass.divider} />
        <div className={profileScreenClass.profileStats}>
          <div
            className={`${profileScreenClass.individualStats} ${
              likesTapped
                ? `${profileScreenClass.chosen}`
                : `${profileScreenClass.notChosen}`
            }`}
            onClick={handleClickLikesTab}
          >
            {likesTapped ? <HeartIcon /> : <HeartIconOutline />}
            {eventsUserLikes.length} Likes
          </div>
          <div
            className={`${profileScreenClass.individualStats} ${
              goingTapped
                ? `${profileScreenClass.chosen}`
                : `${profileScreenClass.notChosen}`
            }`}
            onClick={handleClickGoingTab}
          >
            {goingTapped ? <CheckIcon /> : <CheckIconOutline />}
            {eventsUserGoing.length} Going
          </div>
          <div
            className={`${profileScreenClass.individualStats} ${
              pastTapped
                ? `${profileScreenClass.chosen}`
                : `${profileScreenClass.notChosen}`
            }`}
            onClick={handleClickPassedTab}
          >
            {pastTapped ? <PastIcon /> : <PastIconOutline />}
            {eventsPast.length} Past
          </div>
        </div>
        <div className={profileScreenClass.renderingArea}>
          <hr className={profileScreenClass.divider} />
          {likesTapped ? (
            eventsUserLikes.length > 0 ? (
              eventsUserLikes.map((event: Event, index: number) => (
                <div key={index}>
                  <EventCard eventToRender={event} />
                  <hr className={profileScreenClass.divider} />
                </div>
              ))
            ) : (
              <div className={profileScreenClass.noActivity}>
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
              <div className={profileScreenClass.noActivity}>
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
            <div className={profileScreenClass.noActivity}>
              <NoActivity />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
