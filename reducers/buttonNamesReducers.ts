import { buttonNameAction } from "../actions/buttonNameAction";

export const buttonNamesReducer = (
  state: Map<string, boolean> = new Map(),
  action: buttonNameAction
) => {
  switch (action.type) {
    case "SET_BUTTON_NAME":
      console.log(action);
      return action.payload;
    default:
      return state;
  }
};
