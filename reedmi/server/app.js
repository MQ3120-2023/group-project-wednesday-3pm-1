require('dotenv').config()

const express = require('express') 
const cors = require("cors")
const apiRouter = require("./controllers/api")
// const middleware = require("./utils/middleware")
// var session = require('express-session')

const app = express() // initializes the main Express application instance

// app.use(session({
//     secret: 'keyboard cat',
//     resave: false,
//     saveUninitialized: true,
//     httpOnly: true,
//     cookie: {
//         path: '/auth', 
//         sameSite: 'strict'
//     }
//   }))

// Ryan's Things

const DATA_FILE = './users.json';

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

app.use(cors())
app.use(express.json())
// app.use(middleware.requestLogger)
// app.use(express.static('build'))

// The app.js file imports the apiRouter from api.js with const apiRouter = require("./controllers/api").
// It then uses this router with app.use(apiRouter), which means all the routes we defined in api.js are now active and part of our server's route handling
app.use(apiRouter)
// app.use(middleware.errorMiddleware)



// Exports the Express application instance
// So other files can get access to this instance
module.exports = app
