import { userReducer } from "./userReducer";
import { eventsReducer } from "./eventsReducer";
import { combineReducers } from "redux";
import { Event } from "../server/model/event";

const allReducers = combineReducers({
  userReducer,
  eventsReducer,
});

export default allReducers;
