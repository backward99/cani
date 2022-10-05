import React from "react";
import { Link } from "react-router-dom";
import "style.css";

import { authService} from "myBase";
import { useHistory } from "react-router-dom";

const Navigation = ({refreshUser, UserObj }) => {
    const history = useHistory();
    const onLogOutClick = () => {
        authService.signOut(); 
        history.push("/");
        refreshUser();
    }
    return (
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
                    <button className="btLogOut" onClick={onLogOutClick}> LogOut</button>
                </nav>
            {/* </div> */}
        </div>
    )
}


export default Navigation;