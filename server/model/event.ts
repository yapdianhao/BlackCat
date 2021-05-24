export interface Event {
  eventId: number;
  eventName: string;
  eventDescription: string;
  eventLocation: string;
  eventChannel: string;
  eventPostedBy: string;
  eventPostedOn: Date;
  eventLikesCount: number;
  eventGoingCount: number;
  eventStartDateTime: Date;
  eventEndDateTime: Date;
}
