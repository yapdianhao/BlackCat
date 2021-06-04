import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

import loginScreenClass from "../styles/LoginScreen.module.scss";

import { User } from "../server/model/user";
import BlackCatIcon from "../components/BlackCatIcon";
import UserIcon from "../components/UserIcon";

const LoginScreen = () => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const history = useHistory();

  const handleSubmit = async (event: any) => {
    const users: User[] = await fetch("http://localhost:5000/api/users")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return data;
      });

    const authenticatedUser: User[] = users.filter(
      (user) => user.userName === userName && user.userPassword === userPassword
    );

    // user is found in database
    if (authenticatedUser.length > 0) {
      localStorage.setItem(
        "authenticatedUser",
        `${authenticatedUser[0].userId}`
      );
      history.push("/home");
    } else {
      console.log("login failed!");
    }
  };

  const handleSubmitLogin = async () => {
    await fetch(`http://localhost:5000/login/${userName}/${userPassword}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserLoggedIn(data);
        if (data) {
          history.push("/home");
        }
      });
  };

  return (
    <div className={loginScreenClass.loginBg}>
      <div className={loginScreenClass.subTitle}>
        FIND THE MOST LOVED ACTIVITIES
      </div>
      <div className={loginScreenClass.mainTitle}>BLACK CAT</div>
      <div className={loginScreenClass.blackCatLogo}>
        <BlackCatIcon />
      </div>
      <div className={loginScreenClass.userLoginFormArea}>
        <form>
          <div className={loginScreenClass.userLoginFormInputContainer}>
            <input
              className={loginScreenClass.userLoginFormInputField}
              type="text"
              placeholder="Username"
              name="name"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className={loginScreenClass.userLoginFormInputContainer}>
            <input
              className={loginScreenClass.userLoginFormInputField}
              placeholder="Password"
              name="password"
              type="password"
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </div>
        </form>
      </div>
      <div>
        <button
          className={loginScreenClass.userLoginFormSubmitBtn}
          onClick={handleSubmitLogin}
        >
          <div>SIGN IN</div>
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
