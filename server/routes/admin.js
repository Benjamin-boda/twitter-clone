const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

//User

router.use("/", adminController.isLoggedIn, adminController.isCorrectUser);

router.use("/api/tweets", adminController.isLoggedIn);

router.post("/signup", adminController.signUp);

router.post("/signin", adminController.signIn);

//Tweet

router.get('/', adminController.getIndex);

router.get('/add-tweet', adminController.getAddTweet);

router.post('/add-tweet', adminController.postTweet);

router.get('/edit-tweet/:tweetId', adminController.getEditTweet);

router.post('/edit-tweet', adminController.postEditTweet);

router.get('/:tweetId', adminController.getTweet);

router.get('/:tweets', adminController.getAllTweets);

router.post('/delete', adminController.postDelete);

module.exports = router;