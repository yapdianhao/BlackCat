import { User } from "../model/user";

const faker = require("faker");

let fakeMeImageUrl: string = `${faker.image.imageUrl()}?random=${faker.random.number()}`;
let fakeMeGoingEventsCount = Math.floor(Math.random() * 100);
let fakeMeLikeEventsCount = Math.floor(Math.random() * 100);

let users: User[] = [
  {
    userId: 1,
    userName: "yapdianhao",
    userEmail: "dianhao.yap@shopee.com",
    userImgUrl: fakeMeImageUrl,
    userPassword: "???",
    userLikedEvents: Array.from(
      { length: fakeMeGoingEventsCount },
      () => Math.floor(Math.random() * 100) + 1
    ),
    userGoingEvents: Array.from(
      { length: fakeMeLikeEventsCount },
      () => Math.floor(Math.random() * 100) + 1
    ),
  },
];

for (let i = 2; i <= 100; i++) {
  let fakerUserId: number = i;
  let fakerUserName: string = faker.name.firstName();
  let fakerUserEmail: string = faker.internet.email();
  let fakeImgUrl: string = `${faker.image.imageUrl()}?random=${faker.random.number()}`;
  let fakerUserPassword: string = faker.internet.password();
  let randomGoingEventNum = Math.floor(Math.random() * 100);
  let randomLikeEventNum = Math.floor(Math.random() * 100);
  users.push({
    userId: fakerUserId,
    userName: fakerUserName,
    userEmail: fakerUserEmail,
    userPassword: fakerUserPassword,
    userImgUrl: fakeImgUrl,
    userLikedEvents: Array.from({ length: randomLikeEventNum }, () =>
      Math.floor(Math.random() * 100)
    ),
    userGoingEvents: Array.from({ length: randomGoingEventNum }, () =>
      Math.floor(Math.random() * 100)
    ),
  });
}

export const getUsers = () => {
  return users;
};

// export const createUser = (
//   newUserName: string,
//   newUserEmail: string,
//   newUserPassword: string
// ) => {
//   users.push({
//     userId: users.length + 1,
//     userName: newUserName,
//     userEmail: newUserEmail,
//     userPassword: newUserPassword,
//     userLikedEvents: [],
//     userGoingEvents: [],
//   });
//   console.log(`User {newUserName} added to database.`);
// };

export const getUser = (id: number) => {
  return users[id - 1];
};

export const deleteUser = (toDeleteUserId: number) => {
  users = users.filter((user) => user.userId !== toDeleteUserId);
  return users;
};

export const updateUser = (
  toUpdateUserId: number,
  newUserName: string,
  newUserEmail: string,
  newUserPassword: string
) => {
  const userToUpdate: User = users[toUpdateUserId - 1];
  userToUpdate.userName = newUserName;
  userToUpdate.userEmail = newUserEmail;
  userToUpdate.userPassword = newUserPassword;
  return userToUpdate;
};
