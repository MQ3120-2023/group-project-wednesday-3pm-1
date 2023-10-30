require('dotenv').config()

const express = require('express') 
const cors = require("cors")

const apiRouter = require("./controllers/api")
const axios = require('axios');
const session = require('express-session');
const passport = require('passport');
const fs = require("fs");
const authRoutes = require('./authRoutes');
require('./passportSetup');

const app = express()

var corsOptions = {
  origin: 'http://localhost:3000',
  methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS",
  credentials: true, 
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(express.static('build'))
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(session({
  secret: 'reedmiauth',
  resave: false,
  saveUninitialized: false,
  cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: false,
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
     
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


// These need to be integrated with the database once the front end
// functionality is fixeds
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


// app.use(express.static('build'))

// The app.js file imports the apiRouter from api.js with const apiRouter = require("./controllers/api").
// It then uses this router with app.use(apiRouter), which means all the routes we defined in api.js are now active and part of our server's route handling
app.use(apiRouter)
// app.use(middleware.errorMiddleware)



// Exports the Express application instance
// So other files can get access to this instance
module.exports = app
