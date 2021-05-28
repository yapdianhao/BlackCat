import { eventCountAction } from "../actions/eventCountAction";

export const eventCountReducer = (
  state: Map<number, number> = new Map(),
  action: eventCountAction
) => {
  switch (action.type) {
    case "SET_EVENT_COUNT":
      console.log(action);
      return action.payload;
    default:
      return state;
  }
};
