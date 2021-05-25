import { Comment } from "../model/comment";

const faker = require("faker");

let comments: Comment[] = [];

for (let i = 0; i < 200; i++) {
  let randomUserIdx = Math.floor(Math.random() * 100) + 1;
  let randomDaysBefore = Math.floor(Math.random() * 30) + 7;
  let randomText = faker.lorem.sentences();

  comments.push({
    commentedBy: randomUserIdx,
    commentTimeBefore: randomDaysBefore,
    commentContent: randomText,
  });
}

export const getComments = () => {
  return comments;
};
