export interface User {
  userId: number;
  userName: string;
  userPassword: string;
  userEmail: string;
  userImgUrl: string;
  userLikedEvents: number[];
  userGoingEvents: number[];
}
