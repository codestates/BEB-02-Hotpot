import React, { useState } from "react";
import { logIn } from '../actions/index';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };
    const handleHome = () => {
        navigate("/");
    }

    const reqLogin = async () => {
        const loginURL = "http://localhost:8888/login"
        await axios.post(loginURL, {
            email,
            password
        })
            .then((res) => {
                if (res.data.data) {
                    dispatch(logIn(res.data.data));
                    console.log(res.data.data);
                    navigate('/');
                } else {
                    alert(res.data.message);
                }
            })
            .catch((e) => console.log(e));
    }

    return (
        <div className="modal-wrapper">
            <div className="login-modal">
                <div className="login-header">로그인</div>
                <div className="login-input">
                    <div className="login-id">
                        <input
                            className="email"
                            type="email"
                            id="email"
                            placeholder="Email"
                            onChange={onChangeEmail}
                        />
                    </div>
                    <div className="login-password">
                        <input
                            className="password"
                            type="password"
                            id="password"
                            placeholder="Password"
                            onChange={onChangePassword}
                        />
                    </div>
                    <div className="button-wrapper">
                        <button className="modal-button" onClick={() => reqLogin()}>
                            로그인
                        </button>
                        <button className="modal-button" onClick={() => handleHome()}>
                            홈으로
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login; 