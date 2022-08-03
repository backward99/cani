import React, { useState } from "react";
import { authService } from "myBase";

const Auth = () => {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [NewAccount, setNewAccount] = useState(true);
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
            console.log(error);
        }
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input name="email" type="text" placeholder="Email" required value={Email}
                    onChange={onChange} />
                <input name="password" type="password" placeholder="Password" required value={Password}
                    onChange={onChange} />
                <input type="submit" value={NewAccount ? "Create Account" : "Log In"} />
            </form>
            <div>
                <button>
                    Continue with Google
                </button>
            </div>
        </div>
    )
};
export default Auth;