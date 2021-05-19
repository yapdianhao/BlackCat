import React from "react";
import { useState, useEffect } from "react";

import "../styles/Dashboard.scss";
import { Event } from "../server/model/event";
import EventCard from "./EventCard";
import Divider from "./Divider";

const Dashboard = () => {
  const [eventPosts, setEventPosts] = useState<Event[]>([]);

  const fetchEventData = async () => {
    // todo: set url, call fetch, setstate, update eventposts, use eventPosts.length as next offset
    console.log("here");

    const limit = 10;

    const fetchedData = await fetch(
      `http://localhost:5000/api/events/${eventPosts.length}/${limit}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      });

    setEventPosts([...eventPosts, ...fetchedData]);
  };

  useEffect(() => {
    fetchEventData();
  }, []);

  console.log(eventPosts);
  return (
    <div>
      {eventPosts.map((eventPost: Event, idx: number) => (
        <div>
          <EventCard eventToRender={eventPost} />
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
