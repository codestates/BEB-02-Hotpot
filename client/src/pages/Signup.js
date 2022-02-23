import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    console.log("user=" + value);
  };

  const check = async () => {
    console.log("async=" + user.username);
    const { username, password, confirmPassword } = user;
    if (username && password && password === confirmPassword) {
      await axios.post("http://localhost:8888/signup", user).then((res) => {
        alert(res.data.message);
        navigate("/");
      });
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <div className="signup">
      <h1> Sign Up </h1>
      <div className="signup_user_name">
        <input
          type="text"
          name="username"
          value={user.username}
          onChange={handleChange}
          className="username"
          placeholder="아이디를 입력하세요."
        ></input>
      </div>
      <div className="signup_password">
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={handleChange}
          className="password"
          placeholder="비밀번호를 입력하세요."
        />
      </div>
      <div className="signup_password_confirm">
        <input
          type="password"
          name="confirmPassword"
          value={user.confirmPassword}
          onChange={handleChange}
          className="confirmPassword"
          placeholder="비밀번호 확인"
        />
      </div>
      <div className="signup">
        <input
          type="button"
          value="Sign Up!"
          className="signup_btn"
          onClick={check}
        ></input>
      </div>
    </div>
  );
};

export default SignUp;
