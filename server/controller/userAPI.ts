import {User} from "../model/user";

let users:  User[] = [
    {
        userId: 1,
        userName: 'DianHao',
        userEmail: 'dianhao.yap@shopee.com',
        userPassword: '!@#$%',
    }
];


// set up fake database here

export const getUsers = (req: any, res: any) => {
    console.log(`Users in the database: ${users}`);
    res.send(users);    
};

export const createUser = (req: any, res: any) => {
    const user = req.body;
    //users.push(user);
    console.log(`User {user.username} added to database.`);
};

export const getUser = (req: any, res: any) => {
    res.send(users[req.params.id]);
};

export const deleteUser = (req: any, res: any) => {
    res.send("delete user! Are u sure?");
};

export const updateUser = (req: any, res: any) => {
    res.send("update user!");
};