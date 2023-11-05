require('dotenv').config()

const express = require('express') 
const cors = require("cors")
const session = require('express-session');
const apiRouter = require("./controllers/api")
const authRoutes = require('./controllers/auth');
const passport = require('passport');
const MongoStore = require('connect-mongo');
require('./passportSetup');
const path = require('path');
const production = process.env.NODE_ENV === 'production';

const app = express() // The main Express Server Instance 


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


var corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://reedmi-test.onrender.com'],
  methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS",
  credentials: true, 
  optionsSuccessStatus: 200 
};

app.use(cors(corsOptions));
app.use(express.json())


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

// The app.js file imports the apiRouter from api.js with const apiRouter = require("./controllers/api").
// It then uses this router with app.use(apiRouter), which means all the routes we defined in api.js are now active and part of our server's route handling
app.use(apiRouter)

// Exports the Express application instance
// So other files can get access to this instance


if (production) {
  app.use(express.static(path.join(__dirname, 'reedmi', 'build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'reedmi', 'build', 'index.html'));
  });
}

module.exports = app
