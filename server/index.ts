const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
//app.use(cors);
// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

app.use(express.json());
// app.use(express.urlencoded());

app.use((req: any, res: any, next: any) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// import the rest of the operations
import { getUsers, getUser } from "./controller/userAPI";
// import the rest of the operations
import {
  getEvents,
  getEventById,
  getEventWithLimit,
  getTodayEvents,
  getTomorrowEvents,
  getThisWeekEvents,
  getThisMonthEvents,
  getEventsByChannel,
  getLaterEvents,
  insertCommentIntoEvent,
} from "./controller/eventsAPI";
import { insertComment } from "./controller/commentsAPI";
import { getChannels } from "./controller/channelAPI";

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

app.get("/api/events/:id", (req: any, res: any) => {
  console.log("requested specific event with id");
  res.send(getEventById(req.params.id));
});

app.post("/api/events/:id", (req: any, res: any) => {
  console.log("requesting adding comment into event");
  console.log(req);
  res.send(insertCommentIntoEvent(req.params.id, req.body));
});

app.get("/api/events/:limit/:offset", (req: any, res: any) => {
  res.send(getEventWithLimit(req.params.limit, req.params.offset));
});

app.get("/api/eventstoday", (req: any, res: any) => {
  console.log("requested today events");
  res.send(getTodayEvents());
});

app.get("/api/eventstomorrow", (req: any, res: any) => {
  console.log("requested tomorrow events");
  res.send(getTomorrowEvents());
});

app.get("/api/eventsthisweek", (req: any, res: any) => {
  console.log("requested this week events");
  res.send(getThisWeekEvents());
});

app.get("/api/eventsthismonth", (req: any, res: any) => {
  console.log("requested this month events");
  res.send(getThisMonthEvents());
});

app.get("/api/eventslater", (req: any, res: any) => {
  console.log("requested later events");
  res.send(getLaterEvents());
});

app.get("/api/channels", (req: any, res: any) => {
  console.log("get all channels");
  res.send(getChannels());
});

app.post("/api/comments/", (req: any, res: any) => {
  console.log("request to insert comment");
  insertComment(req.body);
});

app.get("/api/filterchannel/:channelName", (req: any, res: any) => {
  console.log("get filter with channel");
  console.log(req.params.channelName);
  res.send(getEventsByChannel(req.params.channelName));
});

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
