import { eventCountAction } from "../actions/eventCountAction";

export const eventCountReducer = (
  state: Map<number, number> = new Map(),
  action: eventCountAction
): Map<number, number> => {
  switch (action.type) {
    case "SET_EVENT_COUNT":
      return action.payload;
    default:
      return state;
  }
};
