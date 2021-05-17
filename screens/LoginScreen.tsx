import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import "../styles/LoginScreen.scss";

import { User } from "../server/model/user";
import BlackCatIcon from '../components/BlackCatIcon';
import UserIcon from '../components/UserIcon';

const LoginScreen = () => {
    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const history = useHistory();

    const handleSubmit = async (event: any) => {
        console.log("hello");
        const users : User[] = await fetch('http://localhost:5000/api/users').then(
            (response) => response.json()
        ).then(data => {
            return data;
        });
        if (users.filter(user => user.userName === userName && user.userPassword === userPassword).length > 0) {
            history.push("/Home");
        };
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
                <form>
                    <div className="user-login-form-input-container ">
                        <input className="user-login-form-input-field" type="text" placeholder="Username" name="name" onChange={e => setUserName(e.target.value)} />
                    </div>
                    <div className="user-login-form-input-container">
                        <input className="user-login-form-input-field" type="text" placeholder="Password" name="password" onChange={e => setUserPassword(e.target.value)} />
                    </div>
                </form>
            </div>
            <div>
                <button className="user-login-form-submit-btn" onClick={handleSubmit}>
                    SIGN IN
                </button>
            </div>
        </div>
    )
}

export default LoginScreen;