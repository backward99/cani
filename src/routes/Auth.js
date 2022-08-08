import React, { useState } from "react";
import { authService, firebaseInstance } from "myBase";

const Auth = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [NewAccount, setNewAccount] = useState(true);
    const [Error, setError] = useState("");
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
            let data;
            if (NewAccount) {
                data = await authService.createUserWithEmailAndPassword(
                    Email,
                    Password
                );
            } else {
                data = await authService.signInWithEmailAndPassword(
                    Email,
                    Password
                );
            }
            
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    };
    const toggleAccount = () => setNewAccount((prev)=> !prev);
    const onSocialClick = async (event) => {
        const {
            target : {name},
        } = event;
        let provider;
        if (name === "google"){
            provider = new firebaseInstance.auth.GoogleAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="text" placeholder="Email" required value={Email}
                    onChange={onChange} />
                <input name="password" type="password" placeholder="Password" required value={Password}
                    onChange={onChange} />
                <input type="submit" value={NewAccount ? "Create Account" : "Log In"} />
                {Error}
            </form>
            <h1 onClick={toggleAccount}>{NewAccount ? "Sign In" : "Create Account"}</h1>
            <div>
                <button name="google" onClick={onSocialClick}>
                    Continue with Google
                </button>
            </div>
        </div>
    )
};
export default Auth;