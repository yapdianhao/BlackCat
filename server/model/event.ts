export interface Event {
    eventId: number;
    eventName: string;
    eventDescription: string;
    eventLocation: string;
    eventLikesCount: number;
    eventGoingCount: number;
    eventStartDateTime: Date;
    eventEndDateTime: Date;
};