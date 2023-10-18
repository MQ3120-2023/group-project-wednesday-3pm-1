
require("dotenv").config()
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const fs = require("fs");
const authRoutes = require('./authRoutes');
require('./passportSetup');




const url = "mongodb+srv://mifta:Cwss2018@cluster0.bigvbv9.mongodb.net/reedmiDB?retryWrites=true&w=majority"

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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


app.use('/api/auth', authRoutes);

const apiURL = 'https://newsapi.org/v2/everything'
// const apiKey = process.env.API_KEY // does not work, will fix later
const apiKey = '8ab8a0f1c0b346d6b1182bac2e252c9e';
// works if I hardcode the API key
// const query = 'bitcoin'
app.get('/', (req, res) => {
  res.send('Hello World');
});



app.get("/api/posts", (_, response) => {
  console.log("received request post");
  response.send(posts);
});

//MAKING NEW COMMENTS
app.post("/api/posts/:postId/comments"), (req, res) => {
  const postId = parseInt(req.params.postId);
  const comment = req.body;

  // Finds the specified post
  const post = posts.find(p => p.id === postId);
  if (!post) {
      return res.status(404).json({ error: 'Your post has not been found!' });
  }

  // Adds the newly made comment to the post's comment section
  post.comments.push(comment);

  // Saves the updated posts array backwards to the data.json
  fs.writeFileSync("data.json", JSON.stringify({ posts: posts }, null, 2));

}


//LIKING
app.post("/api/posts/:postId/like", (req, res) => {
  const body = req.body
  const postId = parseInt(req.params.postId, 10);
  const post = posts.find(p => p.id === postId);
  if (!post) {
      return res.status(404).json({ error: 'Your post has not been found!' });
  }

  post.likes = post.likes + body.likes;

  fs.writeFileSync("data.json", JSON.stringify({ posts: posts }, null, 2));
  res.json({ status: 'Request fulfilled' });
});

//DISLIKING
app.post("/api/posts/:postId/dislike", (req, res) => {
  const body = req.body
  const postId = parseInt(req.params.postId, 10);
  const post = posts.find(p => p.id === postId);
  if (!post) {
      return res.status(404).json({ error: 'Your post has not been found!' });
  }

  post.dislikes = post.dislikes + body.dislikes;

  fs.writeFileSync("data.json", JSON.stringify({ posts: posts }, null, 2));
  res.json({ status: 'success' });
});

// Fetching Latest News from a third party API
app.get('/api/techNews', (req, res) => {
  const userQuery = req.query.q; 
  // the server is making the request to the third party API using Axios 
  axios.get(apiURL, {
    // headers : {
    //   'X-Api-Key': apiKey
    // }
    params : {
      q: userQuery,
      apiKey: apiKey
    }
  }).then(newsArray => { // once the newsArray is received from API, send it to the Client
    res.json(newsArray.data);
    console.log("Received news data from third party API successfully")
  }).catch(error => {
    console.error(error);  // Add this line
    res.status(404);
    console.log("API Key:", process.env.API_KEY)
    res.send("Server could not fetch data from third-party API")
  });
});



const port = 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


