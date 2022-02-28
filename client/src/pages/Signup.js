import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const SignUp = ({ account }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    address: account,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
    console.log("user=" + value);
  };

  const check = async () => {
    setUser({ ...user, ["address"]: account });
    const { email, username, password, confirmPassword, address } = user;
    if (email && username && password && address && password === confirmPassword) {
      await axios.post("http://localhost:8888/signup", user).then((res) => {
        alert(res.data.message);
        if (res.data.success) {
          navigate("/");
        }
      });
    } else {
      alert("정보를 모두 기입해주세요.");
    }
  };

  return (
    <div id="signup-wrap">
      <h1 id="head-title"> Sign Up & Join Our Community!</h1>
      <div id="signup-container">
        <div id="signup-content">
          <div className='join-content'>
            <div className='join-row'>
              <h3 className='join-title'>
                <label for="email">
                  이메일
                </label>
              </h3>
              <span className='join-box'>
                <input type="email" name="email" id="email" className="join-input" maxlength="30" value={user.email} onChange={handleChange} />
                <span class="join-input-helper">@example.com</span>
              </span>
              <h3 className='join-title'>
                <label for="password">
                  비밀번호
                </label>
              </h3>
              <span className='join-box'>
                <input type="password" name="password" id="password" className="join-input" maxlength="30" value={user.password} onChange={handleChange} />
                <span className='join-input-helper'><LockOpenOutlinedIcon /></span>
              </span>
              <h3 className='join-title'>
                <label for="confirmPassword">
                  비밀번호 확인
                </label>
              </h3>
              <span className='join-box'>
                <input type="password" name="confirmPassword" id="confirmPassword" className="join-input" maxlength="30" value={user.confirmPassword} onChange={handleChange} />
                <span className='join-input-helper'><LockOutlinedIcon /></span>
              </span>
              {(user.confirmPassword !== "" && user.confirmPassword !== user.password)
                ? <span className='join-error'>비밀번호가 일치하지 않습니다.</span>
                : null}
              <h3 className='join-title'>
                <label for="username">
                  닉네임
                </label>
              </h3>
              <span className='join-box'>
                <input type="text" name="username" id="username" className="join-input" maxlength="15" value={user.username} onChange={handleChange} />
              </span>
              <h3 className='join-title'>
                <label for="email">
                  지갑 주소
                </label>
              </h3>
              {account
                ? <span>{account}</span>
                : <span className='join-error'>지갑을 연결해 주세요.</span>}
            </div>
            <div className='join-btn-area'>
              <button className='submit-btn' onClick={check}>
                <span>가입하기</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*<div className="signup_user_name">
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
      </div>*/}
    </div >
  );
};

export default SignUp;
