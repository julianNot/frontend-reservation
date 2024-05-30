const mongoose = require('mongoose');
require('dotenv').config();

const Hotel = require('../models/Hotel');

const dbUri = process.env.MONGODB_URI;

mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', async () => {
  console.log('Connected to MongoDB');

  const hotels = [
    {
      name: 'Hotel Barranquilla',
      location: 'Barranquilla',
      rooms: [
        { type: 'standard', quantity: 30, maxOccupancy: 4 },
        { type: 'premium', quantity: 3, maxOccupancy: 4 }
      ],
      seasons: [
        { season: 'high', price: 150 },
        { season: 'low', price: 100 }
      ],
      availability: [
        { date: new Date('2024-06-01'), rooms: [{ type: 'standard', quantity: 10, maxOccupancy: 4 }, { type: 'premium', quantity: 2, maxOccupancy: 4 }] },
        { date: new Date('2024-06-02'), rooms: [{ type: 'standard', quantity: 8, maxOccupancy: 4 }, { type: 'premium', quantity: 1, maxOccupancy: 4 }] }
      ]
    },
    {
      name: 'Hotel Cali',
      location: 'Cali',
      rooms: [
        { type: 'premium', quantity: 20, maxOccupancy: 6 },
        { type: 'vip', quantity: 2, maxOccupancy: 6 }
      ],
      seasons: [
        { season: 'high', price: 200 },
        { season: 'low', price: 150 }
      ],
      availability: [
        { date: new Date('2024-06-01'), rooms: [{ type: 'premium', quantity: 15, maxOccupancy: 6 }, { type: 'vip', quantity: 1, maxOccupancy: 6 }] },
        { date: new Date('2024-06-02'), rooms: [{ type: 'premium', quantity: 10, maxOccupancy: 6 }, { type: 'vip', quantity: 1, maxOccupancy: 6 }] }
      ]
    },
    {
      name: 'Hotel Cartagena',
      location: 'Cartagena',
      rooms: [
        { type: 'standard', quantity: 10, maxOccupancy: 8 },
        { type: 'premium', quantity: 1, maxOccupancy: 8 }
      ],
      seasons: [
        { season: 'high', price: 180 },
        { season: 'low', price: 130 }
      ],
      availability: [
        { date: new Date('2024-06-01'), rooms: [{ type: 'standard', quantity: 5, maxOccupancy: 8 }, { type: 'premium', quantity: 1, maxOccupancy: 8 }] },
        { date: new Date('2024-06-02'), rooms: [{ type: 'standard', quantity: 4, maxOccupancy: 8 }, { type: 'premium', quantity: 1, maxOccupancy: 8 }] }
      ]
    },
    {
      name: 'Hotel Bogotá',
      location: 'Bogotá',
      rooms: [
        { type: 'standard', quantity: 20, maxOccupancy: 6 },
        { type: 'premium', quantity: 20, maxOccupancy: 6 },
        { type: 'vip', quantity: 2, maxOccupancy: 6 }
      ],
      seasons: [
        { season: 'high', price: 250 },
        { season: 'low', price: 200 }
      ],
      availability: [
        { date: new Date('2024-06-01'), rooms: [{ type: 'standard', quantity: 15, maxOccupancy: 6 }, { type: 'premium', quantity: 15, maxOccupancy: 6 }, { type: 'vip', quantity: 2, maxOccupancy: 6 }] },
        { date: new Date('2024-06-02'), rooms: [{ type: 'standard', quantity: 10, maxOccupancy: 6 }, { type: 'premium', quantity: 10, maxOccupancy: 6 }, { type: 'vip', quantity: 1, maxOccupancy: 6 }] }
      ]
    }
  ];

  await Hotel.deleteMany({});

  await Hotel.insertMany(hotels);
  console.log('Database seeded!');

  db.close();
});
