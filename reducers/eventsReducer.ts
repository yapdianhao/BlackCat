import { eventAction } from "../actions/eventAction";
import { Event } from "../server/model/event";

export const eventsReducer = (state: Event[] = [], action: eventAction) => {
  switch (action.type) {
    case "SET_EVENT":
      console.log(action);
      return action.payload;
    default:
      return state;
  }
};
