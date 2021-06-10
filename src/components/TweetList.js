import React, { useContext } from "react"
import { AuthContext } from "../context/AuthContext";
import { removeTweet } from "../actions/tweets";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import getVisibleTweets from "../selectors/tweets";

export const TweetList = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const tweetsInStore = useSelector(state => getVisibleTweets(state.tweets, state.filters));

    const { currentUser } = useContext(AuthContext);

    return (
        <div className="tweetlist">

            <ul>
                {
                    tweetsInStore.map((tweet, i) => 
                        currentUser === tweet.author ?
                            <div className="tweetlist__li" key={i}>
                                    <li className="tweetlist__text">{tweet.text}</li>

                                    <div className="tweetlist__button">
                                        <button
                                            className="tweetlist__edit"
                                            onClick={() => history.push(`/edit/${tweet._id}`)}
                                        >
                                            Edit
                                        </button>

                                        <button 
                                        className="tweetlist__remove"
                                            onClick={async() => {
                                                await dispatch(removeTweet({_id: tweet._id}));
                                            }}>
                                                Remove
                                        </button>
                                    </div>
                                    
                            </div>
                            : undefined
                    )
                }
            </ul>
        </div>
    )
}