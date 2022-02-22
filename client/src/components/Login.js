import React, { useState } from "react";


const Login = ({ open, close }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    };

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <div className={open ? "modal-wrapper" : null}>
            {open ? (
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
                            <button className="modal-button" onClick={() => {/*Todo */ }}>
                                로그인
                            </button>
                            <button className="modal-button" onClick={close}>
                                닫기
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Login;