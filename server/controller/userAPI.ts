import {User} from "../model/user";

const faker = require('faker'); 

let users:  User[] = [
    {
        userId: 1,
        userName: 'DianHao',
        userEmail: 'dianhao.yap@shopee.com',
        userPassword: '???',
    }
];

for (let i = 2; i <= 100; i++) {
    let fakerUserId: number = i;
    let fakerUserName: string = faker.name.firstName() + " " + faker.name.lastName();
    let fakerUserEmail: string = faker.internet.email();
    let fakerUserPassword: string = faker.internet.password();
    users.push({userId: fakerUserId, userName: fakerUserName, userEmail: fakerUserEmail, userPassword: fakerUserPassword});
}

export const getUsers = () => {
    console.log(`number of users in the database: ${users}`);
    return JSON.stringify(users);    
};

export const createUser = (newUserName: string, newUserEmail: string, newUserPassword: string) => {
    users.push({userId: users.length + 1, userName: newUserName, userEmail: newUserEmail, userPassword: newUserPassword});
    console.log(`User {newUserName} added to database.`);
};

export const getUser = (id: number) => {
    return users[id - 1];
};

export const deleteUser = (toDeleteId: number) => {
    users = users.filter(user => user.userId != toDeleteId);
    return users;
};

export const updateUser = (toUpdateId: number, newUserName: string, newUserEmail: string, newUserPassword: string) => {
    const userToUpdate: User = users[toUpdateId];
    userToUpdate.userName = newUserName;
    userToUpdate.userEmail = newUserEmail;
    userToUpdate.userPassword = newUserPassword;
    return userToUpdate;
};