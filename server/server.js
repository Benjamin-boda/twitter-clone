const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require("cookie-parser");
require('dotenv').config();


//Set up server
const app = express();
const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'build')));
  // Handle React routing, return all requests to React app
    app.get('*', function(req, res) {
      res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}

// Middleware
app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true
    })
);
app.use(express.json());
app.use(cookieParser());

// app.set('view engine', 'ejs');
// app.set('views', './src/pages');
app.use(express.urlencoded({ extended: false }));
app.use('/static', express.static(path.join(`${__dirname}/public`)));



// Connect to mongoDB server

const password = process.env.REACT_APP_PASSWORD;
const uri = `mongodb+srv://benjy77400:${password}@cluster0.pgvyn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
}).catch((err) => console.log(err));

// Require and use Route files

app.use("/auth", require("./routes/userRouter"));
app.use("/tweet", require("./routes/tweetRouter"));

// Server listen
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})






