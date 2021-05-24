import { Event } from "../model/event";
import { getUsers } from "../controller/userAPI";
import { getChannels } from "./channelAPI";
import {
  dateIsToday,
  dateIsTomorrow,
  dateIsWithinWeek,
  dateIsWithinMonth,
  dateIsLater,
} from "../../helper/DateCalculator";

const faker = require("faker");

let events: Event[] = [];

let channelsForEvents = getChannels();
let usersForEvents = getUsers();

let eventType = [
  "Past",
  "Ongoing",
  "Future",
  "Yesterday",
  "Today",
  "Tomorrow",
  "This week",
  "This month",
];

for (let i: number = 1; i <= 30; i++) {
  let randomEventTypeIdx = Math.floor(Math.random() * eventType.length);
  console.log(randomEventTypeIdx);
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
  let fakePublishDate = new Date();
  fakePublishDate.setDate(
    fakePublishDate.getDate() - Math.floor(Math.random() * 7) + 1
  );
  let fakeEventStartDateTime: Date;
  let fakeEventEndDateTime: Date;
  switch (randomEventTypeIdx) {
    case 0: {
      let startDate = new Date();
      let endDate = new Date();
      startDate.setDate(
        startDate.getDate() - Math.floor(Math.random() * 5) + 1
      );
      endDate.setDate(startDate.getDate() - Math.floor(Math.random() * 10) + 5);
      fakeEventStartDateTime = startDate;
      fakeEventEndDateTime = endDate;
    }
    case 1: {
      let startDate = new Date();
      let endDate = new Date();
      startDate.setDate(
        startDate.getDate() - Math.floor(Math.random() * 5) + 1
      );
      endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 5) + 1);
      fakeEventStartDateTime = startDate;
      fakeEventEndDateTime = endDate;
    }
    case 2: {
      let startDate = new Date();
      let endDate = new Date();
      startDate.setDate(
        startDate.getDate() + Math.floor(Math.random() * 50) + 1
      );
      endDate.setDate(
        startDate.getDate() + Math.floor(Math.random() * 100) + 51
      );
      fakeEventStartDateTime = startDate;
      fakeEventEndDateTime = endDate;

      console.log(fakeEventStartDateTime);
      console.log(fakeEventEndDateTime);
    }
    case 3: {
      let startDate = new Date();
      let endDate = new Date();
      startDate.setDate(startDate.getDate() - 1);
      endDate.setDate(startDate.getDate() - 1);
      endDate.setHours(endDate.getHours() + 1);
      fakeEventStartDateTime = startDate;
      fakeEventEndDateTime = endDate;
    }
    case 4: {
      let startDate = new Date();
      let endDate = new Date();
      startDate.setDate(startDate.getHours() + 1);
      endDate.setDate(startDate.getHours() + 3);
      fakeEventStartDateTime = startDate;
      fakeEventEndDateTime = endDate;
    }
    case 5: {
      let startDate = new Date();
      let endDate = new Date();
      startDate.setDate(startDate.getDate() + 1);
      startDate.setHours(startDate.getHours() - 1);
      endDate.setDate(endDate.getDate() + 1);
      endDate.setHours(endDate.getHours() + 5);
      fakeEventStartDateTime = startDate;
      fakeEventEndDateTime = endDate;
    }
    case 6: {
      let startDate = new Date();
      let endDate = new Date();
      startDate.setDate(
        startDate.getDate() + Math.floor(Math.random() * 3) + 1
      );
      endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 7) + 4);
      fakeEventStartDateTime = startDate;
      fakeEventEndDateTime = endDate;
    }
    case 7: {
      let startDate = new Date();
      let endDate = new Date();
      startDate.setDate(
        startDate.getDate() + Math.floor(Math.random() * 7) + 1
      );
      endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 10) + 7);
      fakeEventStartDateTime = startDate;
      fakeEventEndDateTime = endDate;
    }
    default: {
      break;
    }
  }

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
    eventPostedOn: fakePublishDate,
  });
}

export const getEvents = () => {
  console.log(`number of events in the database: ${events.length}`);
  return events;
};

// export const createEvents = (
//   newEventName: string,
//   newEventDescription: string,
//   newEventLocation: string,
//   newEventChannel: string,
//   newPosterName: string,
//   newEventStartDateTime: Date,
//   newEventEndDateTime: Date
// ) => {
//   events.push({
//     eventId: events.length + 1,
//     eventName: newEventName,
//     eventDescription: newEventDescription,
//     eventLocation: newEventLocation,
//     eventStartDateTime: newEventStartDateTime,
//     eventEndDateTime: newEventEndDateTime,
//     eventChannel: newEventChannel,
//     eventLikesCount: 0,
//     eventGoingCount: 0,
//     eventPostedBy: newPosterName,
//   });
// };

export const getEvent = (id: number) => {
  return events[id - 1];
};

export const getEventWithLimit = (limit: number, offset: number) => {
  console.log(`${limit} ${offset}`);
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

export const getTodayEvents = () => {
  return events.filter((event) => dateIsToday(event.eventStartDateTime));
};

export const getTomorrowEvents = () => {
  return events.filter((event) => dateIsTomorrow(event.eventStartDateTime));
};

export const getThisWeekEvents = () => {
  return events.filter((event) => dateIsWithinWeek(event.eventStartDateTime));
};

export const getThisMonthEvents = () => {
  return events.filter((event) => dateIsWithinMonth(event.eventStartDateTime));
};

export const getLaterEvents = () => {
  return events.filter((event) => dateIsLater(event.eventStartDateTime));
};

export const getEventsByChannel = (filterChannelName: string) => {
  console.log(filterChannelName);
  return events.filter((event) => {
    return event.eventChannel === filterChannelName;
  });
};
