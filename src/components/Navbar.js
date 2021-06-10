import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useDispatch } from "react-redux";
import { logoutUser } from "../actions/auth";

export const Navbar = () => {
    const { getLoggedIn, loggedIn } = useContext(AuthContext)

    const history = useHistory();
    const dispatch = useDispatch();
    console.log(loggedIn);

    const logout = async () => {
        await dispatch(logoutUser());
        await getLoggedIn();
        history.push("/");
    };

    return (
        <div className="navbar">
            <div className="navbar__contents">
                
                <Link to="/">
                    <img className="navbar__logo" src={require("../images/twitterLogo.png").default}/>
                </Link>
                {
                    loggedIn === false && 
                        <div>
                            <Link className="navbar__login" to="/login">Log in</Link>
                            <Link className="navbar__register" to="/register">Sign up</Link>
                        </div>
                }
                {
                    loggedIn === true && 
                        <div>
                            <Link className="navbar__login" to="/tweet">My Tweets</Link>
                            <button className="navbar__register" onClick={logout}>Log out</button>
                        </div>
                }
            </div>
        </div>
    )
}