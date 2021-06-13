import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { setTweets } from "../actions/tweets";
import { useDispatch } from "react-redux";

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
    const [loggedIn, setLoggedIn] = useState(undefined);
    const [currentUser, setCurrentUser] = useState(undefined)
    const [username, setUsername] = useState("")
    const dispatch = useDispatch();

    const getLoggedIn = async () => {
        const loggedInRes = await axios.get("/auth/loggedIn");
        setLoggedIn(loggedInRes.data)
        const userId = await axios.get("/auth/userLogged");
        setCurrentUser(userId.data)
        console.log(userId.data)

        if ( localStorage.getItem("user") ) {
            setUsername(localStorage.getItem("user"))
        } else {
            localStorage.setItem("user", username)
        }
    }

    useEffect(() => {
        getLoggedIn();
    }, [])

    return (
        <AuthContext.Provider value={{loggedIn, getLoggedIn, currentUser, username, setUsername}}>
            {props.children}
        </AuthContext.Provider>
    )
}