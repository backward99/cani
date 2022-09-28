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
                <Link to="/profile">File_Scan_result</Link>
            </li>
            <li>
                <Link to="/yaraLog">Yara Log</Link>
            </li>
            <li>
                <Link to="/webSource">Web Source</Link>
            </li>
        </ul>
    </nav>
)
export default Navigation;