import React, { useState } from 'react';
import { setConstantValue } from 'typescript';

import "../styles/LoginScreen.scss";

import BlackCatIcon from '../components/BlackCatIcon';
import User from "../images/user.svg";


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
                <BlackCatIcon />
            </div>
            <div className="user-login-form-area">
                <form className="user-login-form">
                    <label>
                        Name:
                        <input className="user-login-form-input" type="text" name="name" onChange={e => setUserName(e.target.value)} />
                    </label>
                    <label>
                        Password:
                        <input className="user-login-form-input" type="text" name="name" onChange={e => setUserPassword(e.target.value)} />
                    </label>
                </form>

            </div>
            <div>
                <button className="user-login-form-submit-btn" onClick={() => {console.log("clicked!")}}>
                    Click me
                </button>
            </div>
        </div>
    )
}

export default LoginScreen;