const request = require('supertest');
const express = require('express');
const axios = require('axios');
const app = express();

// Your application code
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

// Tests
describe('GET /v1/google-status', () => {
  it('should return Google status', async () => {
    const response = await request(app).get('/v1/google-status');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('url', 'https://www.google.com');
    expect(response.body).toHaveProperty('statusCode');
    expect(response.body).toHaveProperty('duration');
    expect(response.body).toHaveProperty('date');
  });
});

describe('GET /v1/amazon-status', () => {
  it('should return Amazon status', async () => {
    const response = await request(app).get('/v1/amazon-status');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('url', 'https://www.amazon.com');
    expect(response.body).toHaveProperty('statusCode');
    expect(response.body).toHaveProperty('duration');
    expect(response.body).toHaveProperty('date');
  });
});

describe('GET /v1/all-status', () => {
  it('should return status for both Google and Amazon', async () => {
    const response = await request(app).get('/v1/all-status');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);

    const googleStatus = response.body.find(status => status.url === 'https://www.google.com');
    const amazonStatus = response.body.find(status => status.url === 'https://www.amazon.com');

    expect(googleStatus).toHaveProperty('url', 'https://www.google.com');
    expect(googleStatus).toHaveProperty('statusCode');
    expect(googleStatus).toHaveProperty('duration');
    expect(googleStatus).toHaveProperty('date');

    expect(amazonStatus).toHaveProperty('url', 'https://www.amazon.com');
    expect(amazonStatus).toHaveProperty('statusCode');
    expect(amazonStatus).toHaveProperty('duration');
    expect(amazonStatus).toHaveProperty('date');
  });
});
