import { Event } from "../server/model/event";

export type eventAction = {
  type: string;
  payload: Event[];
};
