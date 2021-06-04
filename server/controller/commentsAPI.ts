import { Comment } from "../model/comment";

import * as faker from "faker";

const comments: Comment[] = [];

for (let i = 0; i < 200; i++) {
  const randomUserIdx = Math.floor(Math.random() * 100) + 1;
  const randomDaysBefore = Math.floor(Math.random() * 30) + 7;
  const randomText = faker.lorem.sentences();

  comments.push({
    commentedBy: randomUserIdx,
    commentTimeBefore: randomDaysBefore,
    commentContent: randomText,
  });
}

export const getComments = (): Comment[] => {
  return comments;
};

export const insertComment = (newComment: Comment): void => {
  comments.push(newComment);
};
