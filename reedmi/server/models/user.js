const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true, 
        strict: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        strict: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);

