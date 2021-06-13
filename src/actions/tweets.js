import axios from "axios";

//ADD_TWEET

export const addTweet =  (tweet) => {
    return async function (dispatch) {
        axios.post("/tweet/", tweet)
            .then((res) => {
                console.log(res)
                dispatch({
                    type: "ADD_TWEET",
                    tweet
                })   
            })
        }
}

//REMOVE_TWEET

export const removeTweet =  (_id) => {
    return async function (dispatch) {
        axios.post("/tweet/delete", _id)
            .then(() => {
                dispatch({
                    type: "REMOVE_TWEET",
                    _id
                })   
            })
        }
}

//EDIT_TWEET

export const editTweet = (id, updates) => {
    return async function (dispatch) {
        axios.post(`/tweet/${id}`, updates)
            .then(() => {
                dispatch({
                    type: "EDIT_TWEET",
                    id,
                    updates
                })   
            })
        }
}

// //SET_TWEETS

export const setTweets = () => {
    return async function (dispatch) {
        await axios.get("/tweet/")
            .then((res) => {
                dispatch({
                    type: "SET_TWEETS",
                    tweets: res.data
                })
            })
        }
}

export const setHomepageTweets = () => {
    return async function (dispatch) {
        await axios.get("/tweet/homepage")
            .then((res) => {
                dispatch({
                    type: "SET_TWEETS",
                    tweets: res.data
                })
            })
        }
}