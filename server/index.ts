const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use((req: any, res: any, next: any) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

// import the rest of the operations
import { getUsers, getUser } from "./controller/userAPI";
// import the rest of the operations
import {
  getEvents,
  getEventWithLimit,
  getTodayEvents,
  getTomorrowEvents,
  getThisWeekEvents,
  getThisMonthEvents,
  getEventsByChannel,
} from "./controller/eventsAPI";
import { getChannels } from "./controller/channelAPI";
import { resolveSoa } from "dns";

const port: string | number = process.env.PORT || 5000;

app.get("/", (req: any, res: any) => {
  console.log("you have reached the home directory!");
  res.send("this is from express.js");
});

app.get("/api/users", (req: any, res: any) => {
  console.log("send all users");
  res.send(getUsers());
});

app.get("/api/users/:id", (req: any, res: any) => {
  res.send(getUser(req.params.id));
});

app.get("/api/events", (req: any, res: any) => {
  res.send(getEvents());
});

// app.get("/api/events/:id", (req: any, res: any) => {
//   res.send("get an event");
// });

app.get("/api/events/:limit/:offset", (req: any, res: any) => {
  res.send(getEventWithLimit(req.params.limit, req.params.offset));
});

app.get("/api/events/today", (req: any, res: any) => {
  console.log("requested today events");
  res.send(getTodayEvents());
});

app.get("/api/events/tomorrow", (req: any, res: any) => {
  console.log("requested tomorrow events");
  res.send(getTomorrowEvents());
});

app.get("/api/events/thisweek", (req: any, res: any) => {
  console.log("requested this week events");
  res.send(getThisWeekEvents());
});

app.get("/api/events/thismonth", (req: any, res: any) => {
  console.log("requested this month events");
  res.send(getThisMonthEvents());
});

app.get("/api/events/later", (req: any, res: any) => {
  console.log("requested later events");
  // res.send(getLaterEvents());
});

app.get("/api/channels", (req: any, res: any) => {
  console.log("get all channels");
  res.send(getChannels());
});

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
