import { buttonNameAction } from "../actions/buttonNameAction";

export const buttonNamesReducer = (
  state: Map<string, boolean> = new Map(),
  action: buttonNameAction
): Map<string, boolean> => {
  switch (action.type) {
    case "SET_BUTTON_NAME":
      return action.payload;
    default:
      return state;
  }
};
