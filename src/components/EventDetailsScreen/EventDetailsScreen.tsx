import React, { useState, useEffect } from "react";
import { useLocation } from "react-router";

import { Event } from "../../../server/model/event";
import EventDetailsToolBar from "../EventDetailsToolBar/EventDetailsToolBar";
import EventDetailsBody from "../EventDetailsBody/EventDetailsBody";

const EventDetailsScreen = (): JSX.Element => {
  const [eventToRender, setEventToRender] = useState<Event>();

  const eventDetailsPath = useLocation().pathname;

  const paramsIdx = eventDetailsPath.lastIndexOf("/");

  const eventToRenderId = eventDetailsPath.slice(paramsIdx + 1);

  const fetchEventToRender = async () => {
    await fetch(`http://localhost:5000/api/events/${eventToRenderId}`)
      .then((response) => response.json())
      .then((data) => {
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
        {eventToRender === undefined ? null : (
          <EventDetailsBody eventToRender={eventToRender} />
        )}
      </main>
    </div>
  );
};

export default EventDetailsScreen;
