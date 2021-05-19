import { Event } from "../model/event";
import { getUsers } from "../controller/userAPI";
import { getChannels } from "./channelAPI";

const faker = require("faker");

let events: Event[] = [];

let channelsForEvents = getChannels();
let usersForEvents = getUsers();

for (let i: number = 1; i <= 30; i++) {
  let fakeEventName: string = faker.lorem.words();
  let fakeEventDescription: string =
    faker.lorem.sentence() +
    " " +
    faker.lorem.sentence() +
    " " +
    faker.lorem.sentence();
  let fakeEventLocation: string = faker.address.streetAddress();
  let fakePosterName: string =
    usersForEvents[Math.floor(Math.random() * usersForEvents.length)].userName;
  let fakeEventLikesCount: number = Math.floor(
    Math.random() * usersForEvents.length
  );
  let fakeEventGoingCount: number = Math.floor(
    Math.random() * usersForEvents.length
  );
  let fakeChannelName: string =
    channelsForEvents[Math.floor(Math.random() * channelsForEvents.length)]
      .channelName;
  let fakeEventStartDateTime: Date = new Date();
  let fakeEventEndDateTime: Date = new Date();

  events.push({
    eventId: i,
    eventName: fakeEventName,
    eventDescription: fakeEventDescription,
    eventLocation: fakeEventLocation,
    eventLikesCount: fakeEventLikesCount,
    eventGoingCount: fakeEventGoingCount,
    eventStartDateTime: fakeEventStartDateTime,
    eventEndDateTime: fakeEventEndDateTime,
    eventChannel: fakeChannelName,
    eventPostedBy: fakePosterName,
  });
}

export const getEvents = () => {
  console.log(`number of events in the database: ${events.length}`);
  return events;
};

export const createEvents = (
  newEventName: string,
  newEventDescription: string,
  newEventLocation: string,
  newEventChannel: string,
  newPosterName: string,
  newEventStartDateTime: Date,
  newEventEndDateTime: Date
) => {
  events.push({
    eventId: events.length + 1,
    eventName: newEventName,
    eventDescription: newEventDescription,
    eventLocation: newEventLocation,
    eventStartDateTime: newEventStartDateTime,
    eventEndDateTime: newEventEndDateTime,
    eventChannel: newEventChannel,
    eventLikesCount: 0,
    eventGoingCount: 0,
    eventPostedBy: newPosterName,
  });
};

export const getEvent = (id: number) => {
  return events[id - 1];
};

export const getEventWithLimit = (limit: number, offset: number) => {
  return events.slice(+limit, +limit + +offset);
};

export const deleteEvent = (toDeleteEventId: number) => {
  events = events.filter((event) => event.eventId !== toDeleteEventId);
  return events;
};

export const updateEvent = (
  toUpdateEventId: number,
  newEventName: string,
  newEventDescription: string,
  newEventLocation: string,
  newEventChannel: string,
  newPosterName: string,
  newEventStartDateTime: Date,
  newEventEndDateTime: Date
) => {
  const eventToUpdate: Event = events[toUpdateEventId - 1];
  eventToUpdate.eventName = newEventName;
  eventToUpdate.eventDescription = newEventDescription;
  eventToUpdate.eventLocation = newEventLocation;
  eventToUpdate.eventStartDateTime = newEventStartDateTime;
  eventToUpdate.eventEndDateTime = newEventEndDateTime;
  eventToUpdate.eventChannel = newEventChannel;
  eventToUpdate.eventPostedBy = newPosterName;
  return eventToUpdate;
};
