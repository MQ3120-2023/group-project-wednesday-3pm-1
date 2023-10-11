const express = require('express');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('./models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.send({ message: 'Registered successfully!' });
});

router.post('/login', passport.authenticate('local'), (req, res) => {
    res.send({ message: 'Logged in successfully!', user: req.user });
});

router.post('/logout', (req, res) => {
    req.logout();
    res.send({ message: 'Logged out successfully!' });
});

module.exports = router;
