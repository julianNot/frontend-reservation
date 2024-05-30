const express = require('express');
const router = express.Router();
const Hotel = require('../models/Hotel');

router.get('/', async (req, res) => {
  try {
    const hotels = await Hotel.find();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/availability', async (req, res) => {
  const { location, date } = req.query;
  try {
    const hotels = await Hotel.find({ location });
    const availableHotels = hotels.filter(hotel => {
      return hotel.availability.some(avail => avail.date.toISOString().split('T')[0] === date);
    });
    res.json(availableHotels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/tariffs', async (req, res) => {
  const { location, season, roomType, numPeople } = req.query;
  try {
    const hotel = await Hotel.findOne({ location });
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel not found' });
    }
    const seasonData = hotel.seasons.find(s => s.season === season);
    if (!seasonData) {
      return res.status(404).json({ error: 'Season not found' });
    }
    const roomData = hotel.rooms.find(r => r.type === roomType);
    if (!roomData) {
      return res.status(404).json({ error: 'Room type not found' });
    }
    if (numPeople > roomData.maxOccupancy) {
      return res.status(400).json({ error: 'The number of people exceeds the maximum occupancy for this room type.' });
    }
    const price = seasonData.price * Math.ceil(numPeople / roomData.maxOccupancy);
    res.json({ price });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
