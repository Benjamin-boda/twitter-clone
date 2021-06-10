import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthContext } from "../context/AuthContext";
import { loginUser } from "../actions/auth";

export const Login = () => {
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const { getLoggedIn, username, setUsername } = useContext(AuthContext);
    const history = useHistory();
    const dispatch = useDispatch();

    const login = async (e) => {
        e.preventDefault();

        try {
            const loginData = {
                username,
                password
            }

            await dispatch(loginUser(loginData));
            await getLoggedIn();
            setError("")
            history.push("/")
        } catch (err) {
            console.error(err);
            setError("Error, please verify your username and password")
        }
    }

    return (
        <div className="login">
            <h1 className="login__title">Log in to your account</h1>
            <form className="login__form" onSubmit={login}>
                <input 
                    className="login__input" 
                    onChange={(e) => setUsername(e.target.value)} 
                    type="text" 
                    placeholder="Username" 
                    value={username}
                    maxLength="12"
                    />
                <p className={username.length >= 4 ? "login__alert__true" : "login__alert__false"}>*Your username must be between 4 and 12 characters long.</p>    
                <input 
                    className="login__input" 
                    onChange={(e) => setPassword(e.target.value)} 
                    type="password" 
                    placeholder="Password" 
                    value={password}
                    maxLength="16"
                    />
                <p className={password.length >= 4 ? "login__alert__true" : "login__alert__false"}>*Your password must be between 4 and 16 characters long.</p>
                <button className="login__button" type="submit">Log in</button>
            </form>
            
            { error ? <p className={"login__alert__false"}>{error}</p> : undefined} 
        </div>
    )
}