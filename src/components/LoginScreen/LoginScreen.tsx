import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import styles from "./LoginScreen.module.scss";

import BlackCatIcon from "../BlackCatIcon/BlackCatIcon";

const LoginScreen = (): JSX.Element => {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [, setUserLoggedIn] = useState(false);

  const history = useHistory();

  const handleSubmitLogin = async () => {
    await fetch(`http://localhost:5000/login/${userName}/${userPassword}`)
      .then((response) => response.json())
      .then((data) => {
        setUserLoggedIn(data);
        if (data) {
          history.push("/home");
        }
      });
  };

  return (
    <div className={styles.loginBg}>
      <div className={styles.subTitle}>FIND THE MOST LOVED ACTIVITIES</div>
      <div className={styles.mainTitle}>BLACK CAT</div>
      <div className={styles.blackCatLogo}>
        <BlackCatIcon />
      </div>
      <div className={styles.userLoginFormArea}>
        <form>
          <div className={styles.userLoginFormInputContainer}>
            <input
              className={styles.userLoginFormInputField}
              type="text"
              placeholder="Username"
              name="name"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className={styles.userLoginFormInputContainer}>
            <input
              className={styles.userLoginFormInputField}
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
          className={styles.userLoginFormSubmitBtn}
          onClick={handleSubmitLogin}
        >
          <div>SIGN IN</div>
        </button>
      </div>
    </div>
  );
};

export default LoginScreen;
