const router = require("express").Router();
const Tweet = require("../models/tweet.model");
const auth = require("../middleware/auth");

router.post("/", auth , async (req, res) => {
    try {
        const { text, username } = req.body;

        const newTweet = new Tweet({
            text,
            author: req.user,
            username
        });

        const savedTweet = await newTweet.save();
        res.json(savedTweet);
    } catch (err) {
        console.error(err);
        res.status(500).send()
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const tweets = await Tweet.find();
        res.json(tweets)
        
    } catch (err) {
        console.error(err);
        res.status(500).send()
    }
})

router.get("/homepage", async (req, res) => {
    try {
        const tweets = await Tweet.find();
        res.json(tweets)
        
    } catch (err) {
        console.error(err);
        res.status(500).send()
    }
})

router.post("/delete", auth, async (req, res) => {
    try {
        const foundTweet = await Tweet.findOne({_id: req.body._id});
        
        await foundTweet.remove();
        
        res.json(foundTweet);
    } catch (err) {
        console.error(err)
        res.status(500).send()
    }
})

//Edit tweet text

router.post("/:id", auth, async (req, res) => {
    const { id } = req.params;
    const { text } = req.body;

    try {
        const editTweet = await Tweet.findOneAndUpdate(
            { _id: id },
            {
                text: text
            }
        );

        res.json(editTweet);
    } catch (err) {
        console.error(err)
        res.status(500).send()
    }
})

module.exports = router;