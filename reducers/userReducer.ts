import { userAction } from "../actions/userAction";
import { User } from "../server/model/user";

let fakeMeGoingEventsCount = Math.floor(Math.random() * 100);
let fakeMeLikeEventsCount = Math.floor(Math.random() * 100);

let user: User = {
  userId: 1,
  userName: "yapdianhao",
  userEmail: "dianhao.yap@shopee.com",
  userImgUrl: "",
  userPassword: "???",
  userLikedEvents: Array.from(
    { length: fakeMeGoingEventsCount },
    () => Math.floor(Math.random() * 100) + 1
  ),
  userGoingEvents: Array.from(
    { length: fakeMeLikeEventsCount },
    () => Math.floor(Math.random() * 100) + 1
  ),
};

export const userReducer = (state: User = null, action: userAction) => {
  switch (action.type) {
    case "SET_USERNAME": {
      console.log("called!");
      return action.payload;
    }
    default:
      return state;
  }
};
