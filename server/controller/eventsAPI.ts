import { Event } from "../model/event";
import { Comment } from "../model/comment";
import { getUsers } from "../controller/userAPI";
import { getChannels } from "./channelAPI";
import { getComments } from "./commentsAPI";
import {
  dateIsToday,
  dateIsTomorrow,
  dateIsWithinWeek,
  dateIsWithinMonth,
  dateIsLater,
} from "../../helper/DateCalculator";
import { User } from "../model/user";

const faker = require("faker");

let events: Event[] = [];

let channelsForEvents = getChannels();
let usersForEvents = getUsers();
let commentsForEvents = getComments();

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

for (let i: number = 1; i <= 100; i++) {
  let randomEventTypeIdx = Math.floor(Math.random() * eventType.length);
  console.log(randomEventTypeIdx);
  let fakeEventName: string = faker.lorem.words();
  let fakeEventDescription: string =
    faker.lorem.sentence() +
    " " +
    faker.lorem.sentence() +
    " " +
    faker.lorem.sentence();
  let fakeEventLocation: string =
    faker.address.streetAddress() + " " + faker.address.secondaryAddress();
  let fakePosterName: number =
    usersForEvents[Math.floor(Math.random() * usersForEvents.length)].userId;
  // random number of users who like this event.
  let fakeUsersWhoLikesEvent: User[] = [];
  let fakeEventLikesCount: number = Math.floor(
    Math.random() * usersForEvents.length
  );
  for (let i = 0; i < fakeEventLikesCount; i++) {
    let fakeUserIdx = Math.floor(Math.random() * usersForEvents.length);
    fakeUsersWhoLikesEvent.push(usersForEvents[fakeUserIdx]);
  }
  // random number of users who is going to this event.
  let fakeUsersWhoGoesEvent: User[] = [];
  let fakeEventGoingCount: number = Math.floor(
    Math.random() * usersForEvents.length
  );
  for (let i = 0; i < fakeEventGoingCount; i++) {
    let fakeUserIdx = Math.floor(Math.random() * usersForEvents.length);
    fakeUsersWhoGoesEvent.push(usersForEvents[fakeUserIdx]);
  }
  let fakeChannelName: string =
    channelsForEvents[Math.floor(Math.random() * channelsForEvents.length)]
      .channelName;
  let fakePublishDate = new Date();
  fakePublishDate.setDate(
    fakePublishDate.getDate() - Math.floor(Math.random() * 7) + 1
  );

  let fakeGallerySize = Math.floor(Math.random() * 10) + 1;
  let fakeGalleryUrls: string[] = [];
  for (let i = 0; i < fakeGallerySize; i++) {
    fakeGalleryUrls.push(
      `${faker.image.imageUrl()}?random=${faker.datatype.number()}`
    );
  }

  let fakeEventStartDateTime: Date;
  let fakeEventEndDateTime: Date;
  let fakeEventComments: Comment[] = [];
  // random number of comments of this post
  let fakeCommentNumbers = Math.floor(Math.random() * 12);
  for (let i = 0; i < fakeCommentNumbers; i++) {
    let fakeCommentIndex = Math.floor(Math.random() * commentsForEvents.length);
    fakeEventComments.push(commentsForEvents[fakeCommentIndex]);
  }
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
    usersLikeEvent: Array.from(new Set(fakeUsersWhoLikesEvent)),
    usersGoingEvent: Array.from(new Set(fakeUsersWhoGoesEvent)),
    eventStartDateTime: fakeEventStartDateTime,
    eventEndDateTime: fakeEventEndDateTime,
    eventChannel: fakeChannelName,
    eventGalleryUrls: fakeGalleryUrls,
    eventPostedBy: fakePosterName,
    eventPostedOn: fakePublishDate,
    eventComments: fakeEventComments,
  });
}

export const getEvents = () => {
  console.log(`number of events in the database: ${events.length}`);
  return events;
};

export const getEventById = (id: number) => {
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

export const processUserLikesEvent = (eventId: number, userId: number) => {
  let targetEvent: Event = events[eventId - 1];
  let userLikesEvent = targetEvent.usersLikeEvent.filter(
    (user) => user.userId === userId
  );
  if (userLikesEvent.length > 0) {
    targetEvent.usersLikeEvent = targetEvent.usersLikeEvent.filter(
      (user) => user.userId !== userId
    );
  } else {
    targetEvent.usersLikeEvent.push(usersForEvents[userId - 1]);
  }
  events[eventId - 1] = targetEvent;
};

export const processUserGoingEvent = (eventId: number, userId: number) => {
  let targetEvent: Event = events[eventId - 1];
  let userGoingEvent = targetEvent.usersGoingEvent.filter(
    (user) => user.userId === userId
  );
  if (userGoingEvent.length > 0) {
    targetEvent.usersGoingEvent = targetEvent.usersGoingEvent.filter(
      (user) => user.userId !== userId
    );
  } else {
    targetEvent.usersGoingEvent.push(usersForEvents[userId - 1]);
  }
  events[eventId - 1] = targetEvent;
};

export const insertCommentIntoEvent = (id: number, comment: Comment) => {
  const oldEvent: Event = events[id - 1];
  console.log(comment);
  oldEvent.eventComments.push(comment);
  events[id - 1] = oldEvent;
  console.log(oldEvent.eventComments);
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

export const getEventWithinRange = (start: Date, end: Date) => {
  return events.filter(
    (event) =>
      event.eventStartDateTime >= start && event.eventEndDateTime <= end
  );
};

export const getEventsByChannel = (filterChannelName: string) => {
  console.log(filterChannelName);
  console.log(filterChannelName);
  return events.filter((event) => {
    return event.eventChannel === filterChannelName;
  });
};
