const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('./models/user');
const cors = require('cors');

const router = express.Router();


var corsOptions = {
    origin: 'http://localhost:3000',
    methods: "GET,HEAD,POST,PATCH,DELETE,OPTIONS",
    credentials: true, 
    optionsSuccessStatus: 200 
};

router.use(cors(corsOptions));
router.use(express.json());


router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Simple validation
    if (!username || !password) {
        return res.status(400).send({ message: 'Please enter all fields' });
    }

    try {
        // Check for existing user
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log("User taken");
            return res.status(400).send({ message: 'User already exists' });
        }

        // Create a new user instance
        const newUser = new User({
            username,
            password // Note: It's crucial to hash passwords before storing them
        });

        // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, async (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                
                // Saving user to the database
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


router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send({ message: 'Logged in successfully!', user: req.user });
});

router.post('/logout', (req, res) => {
    req.logout();
    res.send({ message: 'Logged out successfully!' });
});


const ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    // If the user is not authenticated, you could redirect them to the login page or send a 401 response
    res.status(401).send('You need to log in first.');
  };
  router.get('/current_user', ensureAuthenticated, (req, res) => {
   
    const userData = {
      username: req.user.username,
     
    };
    res.send(userData);
  });



  

module.exports = router;
