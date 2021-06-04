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
} from "../../src/utils/helper/DateCalculator";
import { User } from "../model/user";

import * as faker from "faker";

let events: Event[] = [];

const channelsForEvents = getChannels();
const usersForEvents = getUsers();
const commentsForEvents = getComments();

const eventType = [
  "Past",
  "Ongoing",
  "Future",
  "Yesterday",
  "Today",
  "Tomorrow",
  "This week",
  "This month",
];

for (let i = 1; i <= 100; i++) {
  const randomEventTypeIdx = Math.floor(Math.random() * eventType.length);
  const fakeEventName: string = faker.lorem.words();
  const fakeEventDescription: string =
    faker.lorem.sentence() +
    " " +
    faker.lorem.sentence() +
    " " +
    faker.lorem.sentence();
  const fakeEventLocation: string =
    faker.address.streetAddress() + " " + faker.address.secondaryAddress();
  const fakePosterName: number =
    usersForEvents[Math.floor(Math.random() * usersForEvents.length)].userId;
  const fakeUsersWhoLikesEvent: User[] = [];
  const fakeEventLikesCount: number = Math.floor(
    Math.random() * usersForEvents.length
  );
  for (let i = 0; i < fakeEventLikesCount; i++) {
    const fakeUserIdx = Math.floor(Math.random() * usersForEvents.length);
    fakeUsersWhoLikesEvent.push(usersForEvents[fakeUserIdx]);
  }
  const fakeUsersWhoGoesEvent: User[] = [];
  const fakeEventGoingCount: number = Math.floor(
    Math.random() * usersForEvents.length
  );
  for (let i = 0; i < fakeEventGoingCount; i++) {
    const fakeUserIdx = Math.floor(Math.random() * usersForEvents.length);
    fakeUsersWhoGoesEvent.push(usersForEvents[fakeUserIdx]);
  }
  const fakeChannelName: string =
    channelsForEvents[Math.floor(Math.random() * channelsForEvents.length)]
      .channelName;
  const fakePublishDate = new Date();
  fakePublishDate.setDate(
    fakePublishDate.getDate() - Math.floor(Math.random() * 7) + 1
  );

  const fakeGallerySize = Math.floor(Math.random() * 10) + 1;
  const fakeGalleryUrls: string[] = [];
  for (let i = 0; i < fakeGallerySize; i++) {
    fakeGalleryUrls.push(
      `${faker.image.imageUrl()}?random=${faker.datatype.number()}`
    );
  }

  let fakeEventStartDateTime: Date;
  let fakeEventEndDateTime: Date;
  const fakeEventComments: Comment[] = [];
  const fakeCommentNumbers = Math.floor(Math.random() * 12);
  for (let i = 0; i < fakeCommentNumbers; i++) {
    const fakeCommentIndex = Math.floor(
      Math.random() * commentsForEvents.length
    );
    fakeEventComments.push(commentsForEvents[fakeCommentIndex]);
  }
  switch (randomEventTypeIdx) {
    case 0: {
      const startDate = new Date();
      const endDate = new Date();
      startDate.setDate(
        startDate.getDate() - (Math.floor(Math.random() * 20) + 10)
      );
      endDate.setDate(
        startDate.getDate() - (Math.floor(Math.random() * 10) + 10)
      );
      fakeEventStartDateTime = startDate;
      fakeEventEndDateTime = endDate;
      break;
    }
    case 1: {
      const startDate = new Date();
      const endDate = new Date();
      startDate.setDate(
        startDate.getDate() - Math.floor(Math.random() * 5) + 1
      );
      endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 5) + 1);
      fakeEventStartDateTime = startDate;
      fakeEventEndDateTime = endDate;

      break;
    }
    case 2: {
      const startDate = new Date();
      const endDate = new Date();
      startDate.setDate(
        startDate.getDate() + Math.floor(Math.random() * 50) + 1
      );
      endDate.setDate(
        startDate.getDate() + Math.floor(Math.random() * 100) + 51
      );
      fakeEventStartDateTime = startDate;
      fakeEventEndDateTime = endDate;

      break;
    }
    case 3: {
      const startDate = new Date();
      const endDate = new Date();
      startDate.setDate(startDate.getDate() - 1);
      endDate.setDate(startDate.getDate() - 1);
      endDate.setHours(endDate.getHours() + 1);
      fakeEventStartDateTime = startDate;
      fakeEventEndDateTime = endDate;

      break;
    }
    case 4: {
      const startDate = new Date();
      const endDate = new Date();
      startDate.setDate(startDate.getHours() + 1);
      endDate.setDate(startDate.getHours() + 3);
      fakeEventStartDateTime = startDate;
      fakeEventEndDateTime = endDate;

      break;
    }
    case 5: {
      const startDate = new Date();
      const endDate = new Date();
      startDate.setDate(startDate.getDate() + 1);
      startDate.setHours(startDate.getHours() - 1);
      endDate.setDate(endDate.getDate() + 1);
      endDate.setHours(endDate.getHours() + 5);
      fakeEventStartDateTime = startDate;
      fakeEventEndDateTime = endDate;

      break;
    }
    case 6: {
      const startDate = new Date();
      const endDate = new Date();
      startDate.setDate(
        startDate.getDate() + Math.floor(Math.random() * 3) + 1
      );
      endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 7) + 4);
      fakeEventStartDateTime = startDate;
      fakeEventEndDateTime = endDate;
      break;
    }
    case 7: {
      const startDate = new Date();
      const endDate = new Date();
      startDate.setDate(
        startDate.getDate() + Math.floor(Math.random() * 7) + 1
      );
      endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 10) + 7);
      fakeEventStartDateTime = startDate;
      fakeEventEndDateTime = endDate;
      break;
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

export const getEvents = (): Event[] => {
  return events;
};

export const getEventById = (id: number): Event => {
  return events[id - 1];
};

export const getEventWithLimit = (limit: number, offset: number): Event[] => {
  return events.slice(+limit, +limit + +offset);
};

export const deleteEvent = (toDeleteEventId: number): Event[] => {
  events = events.filter((event) => event.eventId !== toDeleteEventId);
  return events;
};

export const processUserLikesEvent = (
  eventId: number,
  userId: number
): void => {
  const targetEvent: Event = events[eventId - 1];
  userId = +userId;
  const userIdArr = targetEvent.usersLikeEvent.map((user: User) => user.userId);
  if (userIdArr.includes(userId)) {
    targetEvent.usersLikeEvent = targetEvent.usersLikeEvent.filter(
      (user) => user.userId !== userId
    );
  } else {
    targetEvent.usersLikeEvent.push(usersForEvents[userId - 1]);
  }
  events[eventId - 1] = targetEvent;
};

export const processUserGoingEvent = (
  eventId: number,
  userId: number
): void => {
  const targetEvent: Event = events[eventId - 1];
  eventId = +eventId;
  const userIdArr = targetEvent.usersGoingEvent.map(
    (user: User) => user.userId
  );
  if (userIdArr.includes(eventId)) {
    targetEvent.usersGoingEvent = targetEvent.usersGoingEvent.filter(
      (user) => user.userId !== userId
    );
  } else {
    targetEvent.usersGoingEvent.push(usersForEvents[userId - 1]);
  }
  events[eventId - 1] = targetEvent;
};

export const insertCommentIntoEvent = (id: number, comment: Comment): void => {
  const oldEvent: Event = events[id - 1];
  oldEvent.eventComments.push(comment);
  events[id - 1] = oldEvent;
};

export const getTodayEvents = (): Event[] => {
  return events.filter((event) => dateIsToday(event.eventStartDateTime));
};

export const getTomorrowEvents = (): Event[] => {
  return events.filter((event) => dateIsTomorrow(event.eventStartDateTime));
};

export const getThisWeekEvents = (): Event[] => {
  return events.filter((event) => dateIsWithinWeek(event.eventStartDateTime));
};

export const getThisMonthEvents = (): Event[] => {
  return events.filter((event) => dateIsWithinMonth(event.eventStartDateTime));
};

export const getLaterEvents = (): Event[] => {
  return events.filter((event) => dateIsLater(event.eventStartDateTime));
};

export const getEventWithinRange = (start: Date, end: Date): Event[] => {
  return events.filter(
    (event) =>
      event.eventStartDateTime >= start && event.eventEndDateTime <= end
  );
};

export const getEventsByChannel = (filterChannelName: string): Event[] => {
  return events.filter((event) => {
    return event.eventChannel === filterChannelName;
  });
};
