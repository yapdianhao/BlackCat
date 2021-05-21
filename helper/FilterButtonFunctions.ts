import { useDispatch } from "react-redux";

import { Event } from "../server/model/event";
import { store } from "../store/store";

const getAnyTime = async () => {
  // const dispatch = useDispatch();
  // const currRenderingEvents: Event[] = store.getState().eventsReducer;

  const filteredData = await fetch("http://localhost:5000/api/events")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });

  return filteredData;
};

const getToday = async () => {
  // const dispatch = useDispatch();
  // const currRenderingEvents: Event[] = store.getState().eventsReducer;

  const filteredData = await fetch("http://localhost:5000/api/events/today")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });

  return filteredData;
};

const getTomorrow = () => {
  // filter with tomorrow;
};

const getThisWeek = () => {
  // filter this week
};

const getThisMonth = () => {
  // filter with same month;
};

const getLater = () => {
  // filter events that not passed
};

export default [
  getAnyTime,
  getToday,
  getTomorrow,
  getThisWeek,
  getThisMonth,
  getLater,
];
