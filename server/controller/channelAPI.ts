import { Channel } from "../model/channel";

const faker = require("faker");

let channels: Channel[] = [];

for (let i = 0; i < 20; i++) {
  let fakeChannelName: string = faker.internet.domainName();
  channels.push({ channelName: fakeChannelName });
}

export const getChannels = () => {
  return channels;
};
