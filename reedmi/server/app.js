require('dotenv').config()

const express = require('express') 
const cors = require("cors")

const apiRouter = require("./controllers/api")
const axios = require('axios');
const session = require('express-session');
const passport = require('passport');
const fs = require("fs");
const authRoutes = require('./authRoutes');
const MongoStore = require('connect-mongo');
require('./passportSetup');

const app = express()

var corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://reedmi-test.onrender.com'],
  methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS",
  credentials: true, 
  optionsSuccessStatus: 200 
};


app.use(cors(corsOptions));
app.use(express.json())
app.use(express.static('build'))


app.use(session({
  secret: 'reedmiauth',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URL }),
  cookie: {
      secure: false,
      httpOnly: false,
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 1000,
     
  },
  
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/auth', authRoutes.router);

const apiURL = 'https://newsapi.org/v2/everything'
const apiKey = process.env.API_KEY;


// Fetching Latest News from a third party API
app.get('/api/techNews', (req, res) => {
  const userQuery = req.query.q; 
  // the server is making the request to the third party API using Axios 
  axios.get(apiURL, {
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
