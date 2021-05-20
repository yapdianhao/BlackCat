import React from "react";
import { useState, useEffect } from "react";

import "../styles/Dashboard.scss";
import { Event } from "../server/model/event";
import EventCard from "./EventCard";
import Divider from "./Divider";

interface DashBoardProps {
  state: Event[];
  setState: React.Dispatch<React.SetStateAction<Event[]>>;
}

const Dashboard: React.FC<DashBoardProps> = (props) => {
  // const [eventPosts, setEventPosts] = useState<Event[]>([]);
  // const eventPosts: Event[] = props.state;
  // const setEventPosts: React.Dispatch<React.SetStateAction<Event[]>> = props.setState;
  const [offset, setOffset] = useState(0);
  const [loadMore, setLoadMore] = useState(true);

  // const updateEventPosts = (newEventPosts: Event[]) => {
  //   setEventPosts((eventPosts) => [...eventPosts, ...newEventPosts]);
  // };

  // const updateOffSet = () => {
  //   setOffset(offset + 1);
  //   console.log(offset);
  // };

  // const fetchEventData = async () => {
  //   // todo: set url, call fetch, setstate, update eventposts, use eventPosts.length as next offset
  //   console.log("here");

  //   const limit = 10;

  // const fetchedData = await fetch(
  //   `http://localhost:5000/api/events/${offset}/${limit}`
  // )
  //   .then((response) => response.json())
  //   .then((data) => {
  //     setEventPosts([...eventPosts, ...data]);
  //     setOffset(offset + 1);
  //   });

  //updateEventPosts(fetchedData);
  //updateOffSet();
  // console.log([...eventPosts, ...fetchedData]);
  // setEventPosts((eventPosts) => [...eventPosts, ...fetchedData]);
  // setOffset(offset + 10);
  // console.log(eventPosts);
  // console.log(offset);
  // };

  // const infiniteScroll = () => {
  //   console.log(
  //     window.innerHeight + document.documentElement.scrollTop ===
  //       document.documentElement.offsetHeight
  //   );
  //   if (
  //     window.innerHeight + document.documentElement.scrollTop ===
  //     document.documentElement.offsetHeight
  //   ) {
  //     fetchEventData();
  //   }
  // };

  // useEffect(() => {
  //   // window.addEventListener("scroll", infiniteScroll);
  //   // fetchEventData();
  //   fetch(`http://localhost:5000/api/events/${offset}/${limit}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setEventPosts([...eventPosts, ...data]);
  //       setOffset(offset + 1);
  //     });
  // }, []);

  const getData = (needToLoad: boolean) => {
    if (needToLoad) {
      fetch(`http://localhost:5000/api/events/${offset}/10`)
        .then((response) => response.json())
        .then((data) => {
          props.setState([...props.state, ...data]);
        });
    }
  };

  useEffect(() => {
    getData(loadMore);
    setLoadMore(false);
  }, [loadMore]);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        setOffset(offset + 10);
        setLoadMore(true);
      }
    });
  }, [props.state]);

  return (
    <div>
      {props.state.map((eventPost: Event, idx: number) => (
        <div key={idx}>
          <EventCard eventToRender={eventPost} />
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
