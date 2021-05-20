import { Event } from "../server/model/event";

const getAnyTime = (allEvents: Event[]) => {
  return allEvents;
};

const getToday = (allEvents: Event[]) => {
  // filter with same date;
};

const getTomorrow = (allEvents: Event[]) => {
  // filter with tomorrow;
};

const getThisWeek = (allEvents: Event[]) => {
  // filter this week
};

const getThisMonth = (allEvents: Event[]) => {
  // filter with same month;
};

const getLater = (allEvents: Event[]) => {
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
