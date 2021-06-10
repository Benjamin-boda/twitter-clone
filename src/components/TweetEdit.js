import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useParams } from "react-router-dom";
import { editTweet } from "../actions/tweets";

export const TweetEdit = () => {
    const [editedText, setEditedText] = useState("")
    const dispatch = useDispatch();
    const tweetsInStore = useSelector(state => state.tweets)
    const { id } = useParams();
    const history = useHistory();

    const saveEditedTweet = async (e) => {
        e.preventDefault();

        try {
            const tweetUpdate = {
                text: editedText
            };
            await dispatch(editTweet(id, tweetUpdate));
            history.push("/tweet")
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="tweetedit">
            {
                tweetsInStore.map((tweet, i) => 
                    tweet._id === id &&
                        <div key={i}>
                            <p className="tweetedit__text">Actual tweet : {tweet.text}</p>
                            <form className="tweetedit__form">
                                <input 
                                    className="tweetedit__input"
                                    onChange={(e) => setEditedText(e.target.value)} 
                                    type="text" 
                                    value={editedText}
                                    placeholder="Tweet"/>
                                <button className="tweetedit__button" onClick={saveEditedTweet}>Edit your tweet</button>
                            </form>
                        </div>
                )
            }
        </div>
    )
}