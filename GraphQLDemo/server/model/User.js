const mongoose = require('mongoose');

const MSchema = mongoose.Schema;

const userSchema = new MSchema({
    username: String,
    password: String
})

module.exports = mongoose.model('User', userSchema);