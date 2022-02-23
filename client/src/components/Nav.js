import { useState } from "react";
import Login from "./Login";
import { Link } from "react-router-dom";

function Nav() {
  const [open, setOpen] = useState(false);
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
        <button className="nav-buttton" onClick={() => setOpen(true)}>
          로그인
        </button>
        <Login open={open} close={() => setOpen(!open)} />
      </div>
    </div>
  );
}
export default Nav;
