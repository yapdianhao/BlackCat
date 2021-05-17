const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());

app.use((req: any, res: any, next: any) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

//app.use(cors);

import { getUsers, getUser } from "./controller/userAPI";
import { getEvents, getEvent } from "./controller/eventsAPI";

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
  res.send("show all events");
})



app.listen(port, () => {
  console.log(`listening at port ${port}`);
});
