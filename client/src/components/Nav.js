import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../actions/index';
import Login from "./Login";
import { Link } from "react-router-dom";

function Nav() {
  const account = useSelector(state => state.accountReducer);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logOut());
  }

  return (
    <div id="nav-body">
      <span id="title">
        <img id="logo" src="../logo.png" alt="logo" />
        <span id="community-name">
          <Link to="/" style={{ textDecoration: "none" }}>
            Hotpot
          </Link>
        </span>
      </span>
      <div id="menu">
        <span id="signup">
          <Link to="/signup" style={{ textDecoration: "none" }}>
            회원가입
          </Link>
        </span>
        {account.isLogin
          ? (<button className="nav-buttton" onClick={() => handleLogout()}>
            로그아웃
          </button>)
          : (<button className="nav-buttton" onClick={() => setOpen(true)}>
            로그인
          </button>)}

        <Login open={open} close={() => setOpen(!open)} />
      </div>
    </div>
  );
}
export default Nav;
