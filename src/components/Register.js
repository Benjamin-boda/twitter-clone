import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import { registerUser } from "../actions/auth";

export const Register = () => {
    const [error, setError] = useState("")
    const [password, setPassword] = useState("")
    const [passwordVerify, setPasswordVerify] = useState("")

    const { getLoggedIn, username, setUsername } = useContext(AuthContext);
    const history = useHistory();
    const dispatch = useDispatch();

    const register = async (e) => {
        e.preventDefault();

        try {
            const registerData = {
                username,
                password,
                passwordVerify
            }

            await dispatch(registerUser(registerData));
            await getLoggedIn();
            setError("")
            history.push("/")
        } catch (err) {
            console.error(err);
            setError("Error, your password is different")
        }
    }

    return (
        <div className="register">
            <h1 className="register__title">Create your account</h1>
            <form className="register__form" onSubmit={register}>
                <input 
                    className="register__input" 
                    onChange={(e) => setUsername(e.target.value)} 
                    type="text" 
                    placeholder="Username" 
                    value={username}
                    maxLength="12"
                    />
                <p className={username.length >= 4 ? "login__alert__true" : "login__alert__false"}>*Your username must be between 4 and 12 characters long.</p>    
                <input 
                    className="register__input" 
                    onChange={(e) => setPassword(e.target.value)} 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    maxLength="16"
                    />
                <p className={password.length >= 4 ? "login__alert__true" : "login__alert__false"}>*Your password must be between 4 and 16 characters long.</p>
                <input 
                    className="register__input" 
                    onChange={(e) => setPasswordVerify(e.target.value)} 
                    type="password" 
                    placeholder="Verify your password" 
                    value={passwordVerify}
                    maxLength="16"
                    />
                <p className={password === passwordVerify & password.length >= 4 ? "login__alert__true" : "login__alert__false"}>*Your password must be the same.</p>
                <button className="register__button" type="submit">Sign up</button>
            </form>

            { error ? <p className={"login__alert__false"}>{error}</p> : undefined} 
        </div>
    )
}