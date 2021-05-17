export interface User {
    userId: number;
    userName: string;
    userPassword: string;
    userEmail: string;
    userLikedEvents: number[];
    userGoingEvents: number[];
}