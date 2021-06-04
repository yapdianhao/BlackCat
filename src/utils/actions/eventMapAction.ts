import { Event } from "../../../server/model/event";

export type eventMapAction = {
  type: string;
  payload: Map<number, Event>;
};
