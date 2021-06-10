import React, { useEffect } from "react";
import { TweetForm } from "./TweetForm";
import { TweetList } from "./TweetList";
import { useDispatch } from "react-redux";
import { setTweets } from "../actions/tweets";

export const Tweets = () => {
    const dispatch = useDispatch();

    const getTweets = async () => {
        dispatch(setTweets())
        
    }

    useEffect(() => {
        getTweets();
    }, []);

    return (
        <div>
            <TweetForm getTweets={getTweets}/>
            <TweetList/>
        </div>
    )
}