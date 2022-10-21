import React from "react";
import { Link, useLocation } from "react-router-dom";
import "style.css";

import { authService} from "myBase";
import { useHistory } from "react-router-dom";
import logo from "images/dnsLogo2.png";


const Navigation = ({refreshUser, UserObj }) => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut(); 
        history.push("/");
        refreshUser();
    }
    let location = useLocation();
    return (
        <div className="nav">
                <nav>
                <div className="navDns">
                <img className="dnsImage2" alt="dns" src={logo} />
            </div>
                    <ul className="li">
                    
                        <li className={"selectNav" }>
                            <Link to="/"  className={location.pathname ==="/" ? "selected" : ""} >Url Scan Result</Link>
                        </li>
                        <li className={"selectNav" } >
                            <Link to="/profile" className={location.pathname.match("/profile") ? "selected" : ""} >File Scan Result</Link>
                        </li >
                        <li className={ "selectNav"} >
                            <Link to="/yaraLog" className={location.pathname.match("/yaraLog") ? "selected" : ""} >Yara Log</Link>
                        </li>
                    </ul>
                    <button className="btLogOut" onClick={onLogOutClick}> LogOut</button>
                </nav>
        </div>
    )
}


export default Navigation;