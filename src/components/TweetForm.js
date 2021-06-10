import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { addTweet } from "../actions/tweets";
import { AuthContext } from "../context/AuthContext";
import { sortByDate } from "../actions/filters";
import { useHistory } from "react-router";

export const TweetForm = ({ getTweets }) => {
    const [TextTweet, setTextTweet] = useState("")
    const dispatch = useDispatch();
    const history = useHistory();
    const { currentUser, username } = useContext(AuthContext);

    const saveTweet = async (e) => {
        e.preventDefault();

        try {
            const tweetData = {
                text: TextTweet,
                author: currentUser,
                username: username
            };
            await dispatch(addTweet(tweetData));
            await getTweets();
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="tweetform">
            <form className="tweetform__form">
                <textarea
                    className="tweetform__textarea"
                    maxLength="160"
                    onChange={(e) => setTextTweet(e.target.value)} 
                    type="text" 
                    value={TextTweet}
                    placeholder="You can't exceed 160 characters"/>
                <button className="tweetform__button" onClick={saveTweet}>Send your tweet</button>
            </form>

            <select className="tweetform__select" name="date" onChange={(e) => {
                    dispatch(sortByDate(e.target.value))
                    history.push("/tweet")
                }}>
                <option value="">Sort by date</option>
                <option value="newDate">Old to new</option>
                <option value="oldDate">New to old</option>
            </select>

        </div>
    )
}