import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../actions/index";
import { Link } from "react-router-dom";
import ConnectWallet from "./ConnectWallet";

function Nav({ connectWallet }) {
  const account = useSelector((state) => state.accountReducer);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logOut());
  };

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
        <span id="exchange">
          <Link to="/exchange" style={{ textDecoration: "none" }}>
            NFT
          </Link>
        </span>
        <span id="signup">
          <Link to="/signup" style={{ textDecoration: "none" }}>
            회원가입
          </Link>
        </span>
        <span id="login">
          {account.isLogin
            ? (<Link to="/" style={{ textDecoration: "none" }} onClick={() => handleLogout()}>
              로그아웃
            </Link>
            )
            : (<Link to="/login" style={{ textDecoration: "none" }}>
              로그인
            </Link>)
          }
        </span>
        <span id="connect-button">
          <button className="nav-button" onClick={() => connectWallet()}>
            지갑 연결
          </button>
        </span>

        <span>
          <Link to="/transfer" style={{ textDecoration: "none" }} >
            토큰전송
          </Link>
        </span>
      </div>
    </div >
  );
}
export default Nav;
