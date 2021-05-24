import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

import "../styles/EventDetailsScreen.scss";
import { Event } from "../server/model/event";
import EventDetailsToolBar from "../components/EventDetailsToolBar";
import EventDetailsBody from "../components/EventDetailsBody";

const EventDetailsScreen = () => {
  const [eventToRender, setEventToRender] = useState<Event>();

  const eventDetailsPath = useLocation().pathname;

  const paramsIdx = eventDetailsPath.lastIndexOf("/");

  const eventToRenderId = eventDetailsPath.slice(paramsIdx + 1);

  const fetchEventToRender = async () => {
    await fetch(`http://localhost:5000/api/events/${eventToRenderId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEventToRender(data);
      });
  };

  useEffect(() => {
    fetchEventToRender();
  }, []);

  return (
    <div>
      <EventDetailsToolBar />
      <main>
        <EventDetailsBody />
      </main>
    </div>
  );
};

export default EventDetailsScreen;
