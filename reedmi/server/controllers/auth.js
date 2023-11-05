const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/user');
const cors = require('cors');
const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://reedmi-test.onrender.com';

const router = express.Router();

var corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001', 'https://reedmi-test.onrender.com'],
    methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS",
    credentials: true, 
    optionsSuccessStatus: 200 
};


router.use(cors(corsOptions));
router.use(express.json());

router.get('/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] })
);

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect(`${baseURL}/home`);
  }
);

router.get('/oauth2/redirect/google',
  passport.authenticate('google', { failureRedirect: '/login', failureMessage: true }),
  function(req, res) {
    res.redirect('/');
  });

  router.post('/register', async (req, res) => {
    const { email, username, password, confirm } = req.body;

    if (!email || !username || !password) {
        return res.status(400).send({ message: 'Please enter all fields' });
    }

    try {
        
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log("User taken");
            return res.status(400).send({ message: 'User already exists' });
        }

        const newUser = new User({
            email,
            username,
            password
        });

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, async (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
    
                try {
                    const savedUser = await newUser.save();
                    res.send({
                        message: 'User registered successfully!',
                        user: {
                            id: savedUser.id,
                            username: savedUser.username
                        }
                    });
                } catch (error) {
                    res.status(500).send({ message: 'Error registering user', error });
                }
            });
        });
    } catch (error) {
        res.status(500).send({ message: 'Error in registration', error });
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).send({ message: 'An error occurred during authentication', error: err });
        }

        if (!user) {
            return res.status(400).send({ message: info.message });
        }

        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).send({ message: 'An error occurred during login', error: err });
            }

            // User is now logged in
            // You can send back the user details or any other response as needed
            return res.send({
                message: 'Logged in successfully!',
                user: {
                    id: user.id,
                    username: user.username,
                    // email: user.email  // uncomment this if you want to send the email as well
                }
            });
        });
    })(req, res, next);
});


router.post('/logout', function(req, res, next){
    console.log("Logging out");
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect(`${baseURL}/welcome`);
    });
  });

 const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }

    res.status(401).send('You need to log in first.');
  };
  
  router.get('/current_user', ensureAuthenticated, (req, res) => {
   
    const userData = {
      username: req.user.username,
     
    };
    res.send(userData);
  });




module.exports = { router, ensureAuthenticated };
