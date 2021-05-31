import { userReducer } from "./userReducer";
import { eventsReducer } from "./eventsReducer";
import { eventMapReducer } from "./eventMapReducer";
import { eventCountReducer } from "./eventCountReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  userReducer,
  eventsReducer,
  eventMapReducer,
  eventCountReducer,
});

export default allReducers;
