import React, { useState } from "react";
import { authService} from "myBase";
import "style.css";
import logo from "images/dnsLogo.png";
// import "dnsLogo.png"
const Auth = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
                //로그인 기능
                await authService.signInWithEmailAndPassword(
                    Email,
                    Password
                );
        } catch (error) {
            const errorCode = error.code;
            switch (errorCode) {
                case "auth/wrong-password":
                    alert('Wrong password. Please check password');
                    break;
                case "auth/user-not-found":
                    alert('User Not Found. Please check your email name');
                    break;
                case "auth/user-disabled":
                    alert('User disabled. Please check your email name');
                    break;
                case "auth/invalid-email":
                    alert('Invalid email. Please check your email name');
                    break;
                // no default
                }
        }
    };


    return (
        <div className="container">
            <div>
                <img className="dnsImage" alt="dns" src={logo} />
            </div>
            <form onSubmit={onSubmit}>
                <input name="email" type="text" placeholder="Email" required value={Email}
                    onChange={onChange} />
                <input name="password" type="password" placeholder="Password" required value={Password}
                    onChange={onChange} />
                <input className="authSubmit" type="submit" value="Log In" />
            </form>
        </div>
    )
};
export default Auth;