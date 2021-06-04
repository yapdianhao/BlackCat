import { Channel } from "../model/channel";

import * as faker from "faker";

const channels: Channel[] = [];

for (let i = 0; i < 6; i++) {
  const fakeChannelName: string = faker.internet.domainName();
  channels.push({ channelName: fakeChannelName });
}

export const getChannels = (): Channel[] => {
  return channels;
};
