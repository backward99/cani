import React from "react";
import { Link } from "react-router-dom";
import "style.css";

const Navigation = ({ UserObj }) => (
    <div className="nav">
        {/* <div className="nav2"> */}
            <nav>
                <ul className="li">
                    <li >
                        <Link to="/">Url Scan Result</Link>
                    </li>
                    <li>
                        <Link to="/profile">File Scan Result</Link>
                    </li>
                    <li>
                        <Link to="/yaraLog">Yara Log</Link>
                    </li>
                    {/* <li>
                        <Link to="/webSource">Web Source</Link>
                    </li> */}
                </ul>
            </nav>
        {/* </div> */}
    </div>
)
export default Navigation;