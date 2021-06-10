//Get visible tweets

const getVisibleTweets = (tweets, filters) => {
    return tweets.sort((a, b) => {
        if (filters.sortBy === "newDate") {
            return new Date(a.createdAt).toLocaleString() > new Date(b.createdAt).toLocaleString() ? 1 : -1;
        } else if (filters.sortBy === "oldDate") {
            return new Date(a.createdAt).toLocaleString() < new Date(b.createdAt).toLocaleString() ? 1 : -1;
        };
    })
};

export default getVisibleTweets;