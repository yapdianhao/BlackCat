import { eventAction } from "../actions/eventAction";
import { Event } from "../../../server/model/event";

export const eventsReducer = (
  state: Event[] = [],
  action: eventAction
): Event[] => {
  switch (action.type) {
    case "SET_EVENT":
      return action.payload;
    default:
      return state;
  }
};
