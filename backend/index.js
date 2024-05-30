const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./utils/database');
const hotelsRouter = require('./routes/hotel_router');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

db.once('open', async () => {
  console.log('Database connected');
});

app.use('/api/hotels', hotelsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
