export interface Event {
  eventId: number;
  eventName: string;
  eventDescription: string;
  eventLocation: string;
  eventChannel: string;
  eventPostedBy: string;
  eventLikesCount: number;
  eventGoingCount: number;
  eventStartDateTime: Date;
  eventEndDateTime: Date;
}
