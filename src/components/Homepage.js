import React from "react";
import { useSelector } from "react-redux";

export const Homepage = () => {
    const tweetsInStore = useSelector(state => state.tweets);

    return (
        <div className="homepage">
            <h1 className="homepage__title">Latest tweets</h1>
            {
                tweetsInStore.map((tweet, i) =>
                        <div key={i} className="homepage__list">

                            <img className="homepage__image" src={require("../images/Twitter-profile-picture.jpg").default}/>
                            
                            <div className="homepage__tweet__content">

                                <div className="homepage__tweet__user">
                                    <h2 className="homepage__user">{tweet.username}</h2>
                                    <p className="homepage__arobase">@{tweet.username}</p>
                                </div>

                                <p className="homepage__text">{tweet.text}</p>
                            </div>

                        </div>
                )
            }
        </div>
    )
}