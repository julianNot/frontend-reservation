const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  maxOccupancy: {
    type: Number,
    required: true
  }
});

const seasonSchema = new mongoose.Schema({
  season: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

const availabilitySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  rooms: [roomSchema]
});

const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  rooms: [roomSchema],
  seasons: [seasonSchema],
  availability: [availabilitySchema]
});

module.exports = mongoose.model('Hotel', hotelSchema);
