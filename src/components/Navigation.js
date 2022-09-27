import React from "react";
import { Link } from "react-router-dom";
import "style.css";

const Navigation = ({UserObj}) => (
    <nav className="nav">
        <ul className="li">
            <li >
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/profile">{UserObj.displayName}님의 Profile</Link>
            </li>
        </ul>
    </nav>
)
export default Navigation;