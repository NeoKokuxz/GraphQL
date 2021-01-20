const mongoose = require('mongoose');

const MSchema = mongoose.Schema;

//Model
const locationSchema = new MSchema({
    latitude: Number,
    longitude: Number,
    userId: String
})

module.exports = mongoose.model('location', locationSchema);