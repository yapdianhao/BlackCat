import React, { useState, useEffect } from "react";

import { User } from "../server/model/user";
import { Event } from "../server/model/event";

import "../styles/ProfileScreen.scss";
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
      <div className="profile-picture-area">
        <img src={mainUser && mainUser.userImgUrl} />
      </div>
      <div className="profile-name">{mainUser && mainUser.userName}</div>
      <div className="email-area">
        <EmailIcon />
        {mainUser && mainUser.userEmail}
      </div>
      <div className="profile-content">
        <hr className="divider" />
        <div className="profile-stats">
          <div
            className={`individual-stats ${
              likesTapped ? "chosen" : "not-chosen"
            }`}
            onClick={handleClickLikesTab}
          >
            {likesTapped ? <HeartIcon /> : <HeartIconOutline />}
            {eventsUserLikes.length} Likes
          </div>
          <div
            className={`individual-stats ${
              goingTapped ? "chosen" : "not-chosen"
            }`}
            onClick={handleClickGoingTab}
          >
            {goingTapped ? <CheckIcon /> : <CheckIconOutline />}
            {eventsUserGoing.length} Going
          </div>
          <div
            className={`individual-stats ${
              pastTapped ? "chosen" : "not-chosen"
            }`}
            onClick={handleClickPassedTab}
          >
            {pastTapped ? <PastIcon /> : <PastIconOutline />}
            {eventsPast.length} Past
          </div>
        </div>
        <div className="rendering-events-a">
          <hr className="divider" />
          {likesTapped ? (
            eventsUserLikes.length > 0 ? (
              eventsUserLikes.map((event: Event) => (
                <div>
                  <EventCard eventToRender={event} />
                  <hr />
                </div>
              ))
            ) : (
              <div className="no-activity">
                <NoActivity />
              </div>
            )
          ) : goingTapped ? (
            eventsUserGoing.length > 0 ? (
              eventsUserGoing.map((event: Event) => (
                <div>
                  <EventCard eventToRender={event} />
                  <hr />
                </div>
              ))
            ) : (
              <div className="no-activity">
                <NoActivity />
              </div>
            )
          ) : eventsPast.length > 0 ? (
            eventsPast.map((event: Event) => (
              <div>
                <EventCard eventToRender={event} />
                <hr />
              </div>
            ))
          ) : (
            <div className="no-activity">
              <NoActivity />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
