require('dotenv').config();
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const connectDB = require('../utils/db');
const shareRoutes = require('../routes/shareRoutes');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());
app.use('/api', shareRoutes);

let isConnected = false;

const connectIfNeeded = async () => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
};

const handler = serverless(app);

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;
  await connectIfNeeded();
  return handler(event, context);
};
