const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");


//register
router.post("/", async (req, res) => {
    try {
        const {username, password, passwordVerify } = req.body;
    
        //Validation

        if (!username || !password || !passwordVerify)
            return res
                .status(400)
                .json({errorMessage: "Please enter all required fields"});
        
        if (password.length < 6)
            return res
                .status(400)
                .json({errorMessage: "Please enter a password of at least 6 characters"});
        if (password !== passwordVerify)
            return res
                .status(400)
                .json({errorMessage: "Please enter the same password twice"});
    
        const existingUser = await User.findOne({username})
        if (existingUser)
            return res
                .status(400)
                .json({errorMessage: "An account with this username already exists"});

        //hash the password

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        //Save a new user account to the db

        const newUser = new User({
            username,
            passwordHash
        });

        const savedUser = await newUser.save();

        //log the user in

        const token = jwt.sign(
            {
                user: savedUser._id
            },
            process.env.JWT_SECRET
        );

        //send the token in a HTTP-only cookie

        res
            .cookie("token", token, { httpOnly: true })
            .send();

    } catch (err) {
        console.error(err)
        res.status(500).send();
    }
});

//log in

router.post("/login", async (req, res) => {
    try {
        const {username, password } = req.body;
        
        //validate

        if (!username || !password)
            return res
                .status(400)
                .json({ errorMessage: "Please enter all required fields"});

        const existingUser = await User.findOne({username});
        if (!existingUser) 
            return res
                .status(401)
                .json({errorMessage: "wrong email or password"})

        const passwordCorrect = await bcrypt.compare(
            password,
            existingUser.passwordHash
        );
        if (!passwordCorrect) 
            return res
                .status(401)
                .json({errorMessage: "wrong email or password"})

        //sign the token

        const token = jwt.sign(
            {
                user: existingUser._id
            },
            process.env.JWT_SECRET
        );

        //send the token in a HTTP-only cookie

        res
            .cookie("token", token, { httpOnly: true })
            .send();

    } catch (err) {
        console.error(err)
        res.status(500).send();
    }
});

router.get("/logout", (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    })
    .send();
})

router.get("/loggedIn", (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) return res.json(false)
        
        res.send(true);
    } catch (err) {
        res.json(false)
    }
});

router.get("/userLogged", (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) return res.json(false)

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified.user;
        
        res.send(req.user);
    } catch (err) {
        res.json(false)
    }
});

module.exports = router;