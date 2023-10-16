require("dotenv").config()
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());



const DATA_FILE = './users.json';

const fs = require("fs");
const apiURL = 'https://newsapi.org/v2/everything'
// const apiKey = process.env.API_KEY // does not work, will fix later
// works if I hardcode the API key
// const query = 'bitcoin'
app.get('/', (req, res) => {
  res.send('Hello World');
});

let posts = JSON.parse(fs.readFileSync("data.json")).posts;

app.get("/api/posts", (_, response) => {
  console.log("received request post")
  //responds requested product data
  //get request retrieving different parts of json file
  response.send(posts);
});

// Middleware to enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/register', (req, res) => {
  let users = [];
  if (fs.existsSync(DATA_FILE)) {
      users = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  }

  const newUser = req.body;
  const existingUser = users.find(user => user.email === newUser.email);

  if (!existingUser) {
      users.push(newUser);
      fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
  }

  res.send({ status: 'success' });
});

app.get('/checkUser/:email', (req, res) => {
  if (fs.existsSync(DATA_FILE)) {
      const users = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
      const user = users.find(u => u.email === req.params.email);
      res.send(!!user);
  } else {
      res.send(false);
  }
});

//MAKING NEW COMMENTS
app.post("/api/posts/:postId/comments", (req, res) => {
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

  res.send({ status: 'success' });
});


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



