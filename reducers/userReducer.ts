import { userAction } from "../actions/userAction";
// interface UserState {
//   userName: string;
//   renderingEvents: Events[]
// }

// const initialState = {
//   userName: "",
// };

// type Action = {
//   type: string;
//   payload: string;
// };

export const userReducer = (state: string = "", action: userAction) => {
  switch (action.type) {
    case "SET_USERNAME": {
      console.log("called!");
      return action.payload;
    }
    default:
      return state;
  }
};
