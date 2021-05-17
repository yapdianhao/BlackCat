import { Event } from "../model/event";

const faker = require('faker');

let events: Event[] = [];

for (let i : number = 1; i <= 30; i++) {
    let fakeEventName: string = faker.lorem.words();
    let fakeEventDescription: string = faker.lorem.sentence();
    let fakeEventLocation: string = faker.address.streetAddress();
    let fakeEventLikes: number = Math.floor(Math.random() * 100);
    events.push({
        eventId: i,
        eventName: fakeEventName,
        eventDescription: fakeEventDescription,
        eventLocation: fakeEventLocation,
        eventLikes: fakeEventLikes
    });
}

export const getEvents = (req: any, res: any) => {

};

export const createEvents = (req: any, res: any) => {

};

export const getEvent = (req: any, res: any) => {

};

export const deleteEvent = (req: any, res: any) => {

};

export const updateEvent = (req: any, res: any) => {

};