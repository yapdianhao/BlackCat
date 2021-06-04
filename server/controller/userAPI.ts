import { User } from "../model/user";

import * as faker from "faker";

const fakeMeImageUrl = `${faker.image.imageUrl()}?random=${faker.datatype.number()}`;
const fakeMeGoingEventsCount = Math.floor(Math.random() * 100);
const fakeMeLikeEventsCount = Math.floor(Math.random() * 100);

const users: User[] = [
  {
    userId: 1,
    userName: "yapdianhao",
    userEmail: "dianhao.yap@shopee.com",
    userImgUrl: fakeMeImageUrl,
    userPassword: "myself",
    userLikedEvents: Array.from(
      new Set(
        Array.from(
          { length: fakeMeGoingEventsCount },
          () => Math.floor(Math.random() * 100) + 1
        )
      )
    ),
    userGoingEvents: Array.from(
      new Set(
        Array.from(
          { length: fakeMeLikeEventsCount },
          () => Math.floor(Math.random() * 100) + 1
        )
      )
    ),
  },
];

for (let i = 2; i <= 50; i++) {
  const fakerUserId: number = i;
  const fakerUserName: string = faker.name.firstName();
  const fakerUserEmail: string = faker.internet.email();
  const fakeImgUrl = `${faker.image.imageUrl()}?random=${faker.datatype.number()}`;
  const fakerUserPassword: string = faker.internet.password();
  const randomGoingEventNum = Math.floor(Math.random() * 100);
  const randomLikeEventNum = Math.floor(Math.random() * 100);
  users.push({
    userId: fakerUserId,
    userName: fakerUserName,
    userEmail: fakerUserEmail,
    userPassword: fakerUserPassword,
    userImgUrl: fakeImgUrl,
    userLikedEvents: Array.from(
      new Set(
        Array.from({ length: randomLikeEventNum }, () =>
          Math.floor(Math.random() * 100)
        )
      )
    ),
    userGoingEvents: Array.from(
      new Set(
        Array.from({ length: randomGoingEventNum }, () =>
          Math.floor(Math.random() * 100)
        )
      )
    ),
  });
}

export const getUsers = (): User[] => {
  return users;
};

export const getUser = (id: number): User => {
  return users[id - 1];
};

export const checkLoginUser = (username: string, password: string): boolean => {
  return (
    users.filter(
      (user: User) =>
        user.userName === username && user.userPassword === password
    ).length != 0
  );
};
