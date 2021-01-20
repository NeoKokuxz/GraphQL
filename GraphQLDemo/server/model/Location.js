const mongoose = require('mongoose');

const MSchema = mongoose.Schema;

//Model
const locationSchema = new MSchema({
    latitude: Number,
    longitude: Number,
    questId: String
})

module.exports = mongoose.model('Location', locationSchema);