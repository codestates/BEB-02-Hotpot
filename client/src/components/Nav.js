import { useState } from 'react';
import Login from './Login';
import { logIn } from '../actions';


function Nav() {
    const [open, setOpen] = useState(false);
    return (
        <div id="nav-body">
            <span id="title">
                <img id="logo" src="../logo.png" alt="logo" />
                <span id="community-name">Hotpot</span>
            </span>
            <div id="menu">
                <button className='nav-buttton' onClick={() => {/*Todo*/ }} > 회원가입</button>
                <button className='nav-buttton' onClick={() => setOpen(true)} > 로그인</button>
                <Login open={open} close={() => setOpen(!open)} />
            </div>

        </div >
    )
}
export default Nav;
