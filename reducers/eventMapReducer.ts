import { Event } from "../server/model/event";
import { eventMapAction } from "../actions/eventMapAction";

export const eventMapReducer = (
  state: Map<number, Event> = new Map(),
  action: eventMapAction
) => {
  switch (action.type) {
    case "SET_EVENT_MAP":
      console.log(action);
      return action.payload;
    default:
      return state;
  }
};
