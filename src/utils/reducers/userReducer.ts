import { userAction } from "../actions/userAction";
import { User } from "../../../server/model/user";

export const userReducer = (state: User = null, action: userAction): User => {
  switch (action.type) {
    case "SET_USERNAME": {
      console.log("called!");
      return action.payload;
    }
    default:
      return state;
  }
};
