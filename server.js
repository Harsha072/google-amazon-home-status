const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors({
    origin: 'http://localhost:4200' // Replace with your Angular app's URL
  }));
const getStatus = async (url) => {
  const start = Date.now();
  try {
    const response = await axios.get(url);
    const duration = Date.now() - start;
    return {
      url,
      statusCode: response.status,
      duration,
      date: Math.floor(Date.now() / 1000),
    };
  } catch (error) {
    const duration = Date.now() - start;
    return {
      url,
      statusCode: error.response ? error.response.status : 500,
      duration,
      date: Math.floor(Date.now() / 1000),
    };
  }
};

app.get('/v1/google-status', async (req, res) => {
  const status = await getStatus('https://www.google.com');
  res.json(status);
});

app.get('/v1/amazon-status', async (req, res) => {
  const status = await getStatus('https://www.amazon.com');
  res.json(status);
});

app.get('/v1/all-status', async (req, res) => {
  const googleStatus = getStatus('https://www.google.com');
  const amazonStatus = getStatus('https://www.amazon.com');
  const allStatus = await Promise.all([googleStatus, amazonStatus]);
  res.json(allStatus);
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
