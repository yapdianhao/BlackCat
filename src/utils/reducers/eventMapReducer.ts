import { Event } from "../../../server/model/event";
import { eventMapAction } from "../actions/eventMapAction";

export const eventMapReducer = (
  state: Map<number, Event> = new Map(),
  action: eventMapAction
): Map<number, Event> => {
  switch (action.type) {
    case "SET_EVENT_MAP":
      return action.payload;
    default:
      return state;
  }
};
