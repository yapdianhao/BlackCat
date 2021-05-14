import React, { useState } from 'react';
import { setConstantValue } from 'typescript';

import "../styles/LoginScreen.scss";


const LoginScreen = () => {
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");

    const handleSubmit= (event: any) => {
        console.log(userName);
    }

    return (
        <div>
            <div className="sub-title">
                FIND THE MOST LOVED ACTIVITIES
            </div>
            <div className="main-title">
                BLACK CAT
            </div>
            <div className="black-cat-logo">
                <img src={require("../images/logo-cat.svg")}  />
            </div>
            <div className="user-login-form">
                <form>
                    <label>
                        Name:
                        <input className="user-login-form-input" type="text" name="name" onChange={e => setUserName(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input className="user-login-form-input" type="text" name="name" onChange={e => setUserPassword(e.target.value)} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    )
}

export default LoginScreen;