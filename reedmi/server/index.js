const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const fs = require("fs");
const authRoutes = require('./authRoutes');
require('./passportSetup');

const app = express();

const url = "mongodb+srv://mifta:Cwss2018@cluster0.bigvbv9.mongodb.net/reedmiDB?retryWrites=true&w=majority"

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.log('Error connecting to MongoDB:', error.message));

app.use(cors());
app.use(express.json());

app.use(session({
    secret: 'someSecretKey',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.send('Hello World');
});

let posts = JSON.parse(fs.readFileSync("data.json")).posts;

app.get("/api/posts", (_, response) => {
  console.log("received request post");
  response.send(posts);
});

app.use('/api/auth', authRoutes);

const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
