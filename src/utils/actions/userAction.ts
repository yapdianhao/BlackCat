import { User } from "../../../server/model/user";

export type userAction = {
  type: string;
  payload: User;
};
