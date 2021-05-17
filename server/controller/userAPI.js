"use strict";
exports.__esModule = true;
exports.updateUser = exports.deleteUser = exports.getUser = exports.createUser = exports.getUsers = void 0;
var faker = require('faker');
// let users:  User[] = [
//     {
//         userId: 1,
//         userName: 'DianHao',
//         userEmail: 'dianhao.yap@shopee.com',
//         userPassword: '!@#$%',
//     }
// ];
var users = [];
for (var i = 1; i <= 100; i++) {
    var fakerUserId = i;
    var fakerUserName = faker.name.firstName() + " " + faker.name.lastName();
    var fakerUserEmail = faker.internet.email();
    var fakerUserPassword = faker.internet.password();
    users.push({ userId: fakerUserId, userName: fakerUserName, userEmail: fakerUserEmail, userPassword: fakerUserPassword });
}
// set up fake database here
var getUsers = function () {
    console.log("Users in the database: " + users);
    return users;
};
exports.getUsers = getUsers;
var createUser = function (req, res) {
    var user = req.body;
    //users.push(user);
    console.log("User {user.username} added to database.");
};
exports.createUser = createUser;
var getUser = function (id) {
    return users[id - 1];
};
exports.getUser = getUser;
var deleteUser = function (req, res) {
    res.send("delete user! Are u sure?");
};
exports.deleteUser = deleteUser;
var updateUser = function (req, res) {
    res.send("update user!");
};
exports.updateUser = updateUser;
