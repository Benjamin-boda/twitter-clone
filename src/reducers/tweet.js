//Tweets reducer

const tweetsReducerDefaultState = [];

const tweetsReducer = (state = tweetsReducerDefaultState, action) => {
    switch (action.type) {
        case "ADD_TWEET" :
            return [
                ...state,
                action.tweet
            ]
        case "REMOVE_TWEET":
            return state.filter((tweet) => tweet._id !== action._id._id)
        case "RESET_TWEETS":
            return []
        case "EDIT_TWEET":
            return state.map((tweet) => {
                if (tweet._id === action.id) {
                    return {
                        ...tweet,
                        ...action.updates
                    }
                } else {
                    return tweet
                }
            })
        case "SET_TWEETS":
            return action.tweets
        default: 
            return state;
    }
}

export default tweetsReducer;