  
const mongoose = require("mongoose");
// const User = require("./user");

const TweetSchema = mongoose.Schema({
        text: {
            type: String,
            required: true,
            maxLength: 160
        },
        author: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
    }, {
        timestamps: true
    })
;

module.exports = mongoose.model("tweets", TweetSchema);