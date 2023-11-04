const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('./models/user');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.googleclientID,
    clientSecret: process.env.googleclientSecret,
    callbackURL: 'http://localhost:3001/api/auth/google/callback'
  },
  async (token, tokenSecret, profile, done) => {
    try {
      let user = await User.findOne({ 'email': profile.emails[0].value });
      if (!user) {
        const emailSplit = profile.emails[0].value.split('@');
        const baseUsername = emailSplit[0];
        const randomNumber = Math.floor(1000 + Math.random() * 9000);
        const generatedUsername = `${baseUsername}${randomNumber}`;

        user = new User({
          'google.id': profile.emails[0].value,
          username: generatedUsername,
          email: profile.emails[0].value
        });

        await user.save();
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));



passport.use(new LocalStrategy({
    usernameField: 'login',  // 'login' is used for either username or email
    passwordField: 'password'
  }, 
  async (login, password, done) => {
    try {
      // Search for a user by username or email
      const user = await User.findOne({
        $or: [{ username: login }, { email: login }]  // login can be either username or email
      });

      if (!user) {
        return done(null, false, { message: 'No user found with that email or username.' });
      }

      // Match password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;

        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Password incorrect' });
        }
      });
    } catch (error) {
      return done(error);
    }
  }
));


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});
