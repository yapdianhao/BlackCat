import { Event } from "../model/event";

const faker = require('faker');

let events: Event[] = [];

for (let i : number = 1; i <= 30; i++) {
    let fakeEventName: string = faker.lorem.words();
    let fakeEventDescription: string = faker.lorem.sentence();
    let fakeEventLocation: string = faker.address.streetAddress();
    let fakeEventLikesCount: number = Math.floor(Math.random() * 100);
    let fakeEventGoingCount: number = Math.floor(Math.random() * 100);
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
        eventEndDateTime: fakeEventEndDateTime
    });
}

export const getEvents = () => {
    console.log(`number of events in the database: ${events.length}`);
};

export const createEvents = () => {

};

export const getEvent = () => {

};

export const deleteEvent = (toDeleteEventId: number) => {
    events = events.filter(event => event.eventId !== toDeleteEventId);
    return events;
};

export const updateEvent = (toUpdateEventId: number, 
                            newEventName: string, 
                            newEventDescription: string,
                            newEventLocation: string,
                            newEventStartDateTime: Date, 
                            newEventEndDateTime: Date) => {

};