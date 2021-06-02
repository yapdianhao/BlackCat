import { User } from "../model/user";

const faker = require("faker");

let fakeMeImageUrl: string = `${faker.image.imageUrl()}?random=${faker.datatype.number()}`;
let fakeMeGoingEventsCount = Math.floor(Math.random() * 100);
let fakeMeLikeEventsCount = Math.floor(Math.random() * 100);

let users: User[] = [
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
  let fakerUserId: number = i;
  let fakerUserName: string = faker.name.firstName();
  let fakerUserEmail: string = faker.internet.email();
  let fakeImgUrl: string = `${faker.image.imageUrl()}?random=${faker.datatype.number()}`;
  let fakerUserPassword: string = faker.internet.password();
  let randomGoingEventNum = Math.floor(Math.random() * 100);
  let randomLikeEventNum = Math.floor(Math.random() * 100);
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

export const getUsers = () => {
  return users;
};

export const getUser = (id: number) => {
  return users[id - 1];
};

export const checkLoginUser = (username: string, password: string) => {
  return (
    users.filter(
      (user: User) =>
        user.userName === username && user.userPassword === password
    ).length != 0
  );
};
