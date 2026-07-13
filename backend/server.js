require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./utils/db');
const shareRoutes = require('./routes/shareRoutes');
const limiter = require('./middleware/rateLimiter');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());
app.use(limiter);

app.use('/api', shareRoutes);

connectDB().then(() => {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
