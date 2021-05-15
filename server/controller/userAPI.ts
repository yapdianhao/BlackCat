import {User} from "../model/user";

let users:  User[] = [];

// set up fake database here

export const getUsers = (req: any, res: any) => {
    console.log(`Users in the database: ${users}`);
    res.send(users);    
};

export const createUser = (req: any, res: any) => {
    const user = req.body;
    users.push({...user, userId: users.length + 1});
    console.log(`User {user.username} added to database.`);
};

export const getUser = (req: any, res: any) => {
    res.send(req.params.id);
};

export const deleteUser = (req: any, res: any) => {

};

export const updateUser = (req: any, res: any) => {

};