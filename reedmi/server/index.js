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


  var corsOptions = {
    origin: 'http://localhost:3000',
    methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS",
    credentials: true, 
    optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(session({
  secret: 'reedmiauth',
  resave: false,
  saveUninitialized: false,
  cookie: {
      secure: process.env.NODE_ENV === 'production',  // Set to true if you are using https
      httpOnly: false, // client-side script cannot read the cookie
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      //domain: 'localhost',
  }
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
