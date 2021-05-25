import { Comment } from "./comment";
import { User } from "./user";

export interface Event {
  eventId: number;
  eventName: string;
  eventDescription: string;
  eventLocation: string;
  eventChannel: string;
  eventPostedBy: number;
  eventPostedOn: Date;
  eventGalleryUrls: string[];
  usersGoingEvent: User[];
  usersLikeEvent: User[];
  eventStartDateTime: Date;
  eventEndDateTime: Date;
  eventComments: Comment[];
}
