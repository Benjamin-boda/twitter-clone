const Tweet = require('../models/tweet.model');
const User = require("../models/user.model");

const jwt = require("jsonwebtoken");

//Tweet

exports.getIndex = async (req, res) => {
    const tweet = await Tweet.find((data) => data);

    try {
        console.log(tweet);
        // Data rendered as an object and passed down into index.ejs
        // res.status(200).render('index', { anime: anime });

        // Data returned as json so a fetch/axios requst can get it
        res.json(tweet);
    } catch (error) {
        console.log(error);
    }
};

exports.getAllTweets = async function (req, res, next) {
    try {
        let tweets = await Tweet
            .find()
            .sort({createdAt: 'desc'})
            .populate("user", {
                username: true
            });
        res.status(200).json(tweets)
    }
    catch (err) {
        next(err);
    }
};

exports.getTweet = async (req, res, next) => {
    try {
        let tweet = await Tweet.findById(req.params.tweet_id);
        return res.status(200).json(tweet);
    }
    catch (err) {
        return next(err);
    }
};

exports.getAddTweet = (req, res) => {
    res.status(200).render('edit-tweet', { editing: false });
};

exports.getEditTweet = async (req, res) => {
    const tweetId = req.params.tweetId;

    const editMode = req.query.edit;

    if (!editMode) {
        return res.redirect('/');
    }

    const tweet = await Tweet.findById(tweetId);

    try {
        if (!tweetId) {
            return res.redirect('/');
        }
        console.log(tweet);
        res.status(200).render('edit-tweet', { tweet: tweet, editing: editMode });
    } catch (error) {
        console.log(error);
    }
};

exports.postTweet = async (req, res, next) => {
    try {
        let tweet = await Tweet.create({
            text: req.body.text,
            user: req.params.id
        });
        let foundUser = await User.findById(req.params.id);
        foundUser.tweets.push(tweet.id);
        await foundUser.save();
        let newTweet = await Tweet.findById(tweet.id).populate("user", {
            username: true,
            id: true
        })

        return res.status(200).json(newTweet).redirect("/");
    }
    catch (err) {
        return next(err);
    }
};

exports.postEditTweet = (req, res) => {
    const tweetId = req.body.tweetId;
    const { text, timestamps } = req.body;

    Tweet.findById(tweetId)
        .then((tweet) => {
            tweet.text = name;
            tweet.timestamps = image;

            return tweet.save();
        })
        .then(() => {
            console.log('Item Updated');
            res.status(201).redirect('/');
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postDelete = async (req, res, next) => {
    try {
        let foundTweet = await Tweet.findById(req.params.tweet_id);
        await foundTweet.remove();
        return res.status(200).json(foundTweet);
    }
    catch (err) {
        return next(err);
    }
};

//User

exports.signIn = async function(req, res, next) {
    // finding a user
    try {
        let user = await User.findOne({
            username: req.body.username
        });
        let { id, username } = user;
        if (user) {
            let token = jwt.sign(
                {
                    id,
                    username
                },
                process.env.JWT_SECRET
            );
            return res.status(200).json({
                id,
                username,
                token
            })
        } else {
            return next({
                status: 400,
                message: "Invalid Username."
            });
        }
    } catch (e) {
        return next({ status: 400, message: "Invalid Username" });
    }
};

exports.signUp = async function (req, res, next) {
    try {
        let user = await User.create(req.body);
        let {id, username} = user;
        let token = jwt.sign({
            id,
            username
        }, process.env.JWT_SECRET);

        return res.status(200).json({
            id,
            username,
            token
        })

        
    }
    catch (err) {
        if (err.code === 11000) {
            err.message = "Sorry that username";
        }
        return next({
            status: 400,
            message: err.message
        })
    }
};

// make sure user is logged in
exports.isLoggedIn = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if (decoded) {
                return next();
            } else {
                return next({
                    status: 401,
                    message: "Login First"
                })
            }
        })
    }
    catch (e) {
        return next({
            status: 401,
            message: "Login First"
        })
    }
};

// make sure we get the right user
exports.isCorrectUser = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
            if(decoded && decoded.id=== req.params.id){
                return next();
            }else{
                return next({
                    status:401,
                    message:"Unauthorized"
                })
            }
        })
    }
    catch (e) {
        return next({
            status:401,
            message:"Unauthorized"
        })
    }
}