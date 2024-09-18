const request = require('supertest');
const app = require('../server'); 
const axios = require('axios');


jest.mock('axios');

// Happy path test cases
describe('GET /v1/google-status', () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  it('should return Google status', async () => {
   
    axios.get.mockResolvedValueOnce({
      status: 200,
      data: {
        url: 'https://www.google.com',
        statusCode: 200,
        duration: 123,
        date: Math.floor(Date.now() / 1000),
      },
    });

    const response = await request(app).get('/v1/google-status');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('url', 'https://www.google.com');
    expect(response.body).toHaveProperty('statusCode');
    expect(response.body).toHaveProperty('duration');
    expect(response.body).toHaveProperty('date');
  });
});

describe('GET /v1/amazon-status', () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  it('should return Amazon status', async () => {
   
    axios.get.mockResolvedValueOnce({
      status: 200,
      data: {
        url: 'https://www.amazon.com',
        statusCode: 200,
        duration: 234,
        date: Math.floor(Date.now() / 1000),
      },
    });

    const response = await request(app).get('/v1/amazon-status');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('url', 'https://www.amazon.com');
    expect(response.body).toHaveProperty('statusCode');
    expect(response.body).toHaveProperty('duration');
    expect(response.body).toHaveProperty('date');
  });
});

describe('GET /v1/all-status', () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  it('should return status for both Google and Amazon', async () => {
   
    axios.get
      .mockResolvedValueOnce({
        status: 200,
        data: {
          url: 'https://www.google.com',
          statusCode: 200,
          duration: 123,
          date: Math.floor(Date.now() / 1000),
        },
      })
      .mockResolvedValueOnce({
        status: 200,
        data: {
          url: 'https://www.amazon.com',
          statusCode: 200,
          duration: 234,
          date: Math.floor(Date.now() / 1000),
        },
      });

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

// Sad path test cases

describe('GET /v1/google-status (Sad Path)', () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  it('should handle error when Google request fails', async () => {
   
    axios.get.mockRejectedValueOnce({
      response: {
        status: 500,
        data: 'Internal Server Error',
      },
    });

    const response = await request(app).get('/v1/google-status');
   
    expect(response.status).toBe(200); 
    expect(response.body).toHaveProperty('url', 'https://www.google.com');
    expect(response.body).toHaveProperty('statusCode', 500); 
    expect(response.body).toHaveProperty('duration');
    expect(response.body).toHaveProperty('date');
  });
});

describe('GET /v1/amazon-status (Sad Path)', () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  it('should handle error when Amazon request fails', async () => {

    axios.get.mockRejectedValueOnce({
      response: {
        status: 503,
        data: 'Service Unavailable',
      },
    });

    const response = await request(app).get('/v1/amazon-status');
    
  
    expect(response.status).toBe(200); 
    expect(response.body).toHaveProperty('url', 'https://www.amazon.com');
    expect(response.body).toHaveProperty('statusCode', 503); 
    expect(response.body).toHaveProperty('duration');
    expect(response.body).toHaveProperty('date');
  });
});

describe('GET /v1/all-status (Sad Path)', () => {
  beforeEach(() => {
    axios.get.mockReset();
  });

  it('should handle errors when both Google and Amazon requests fail', async () => {
  
    axios.get
      .mockRejectedValueOnce({
        response: {
          status: 500,
          data: 'Internal Server Error',
        },
      })
      .mockRejectedValueOnce({
        response: {
          status: 503,
          data: 'Service Unavailable',
        },
      });

    const response = await request(app).get('/v1/all-status');
    
   
    expect(response.status).toBe(200); 
    expect(response.body).toHaveLength(2);

    const googleStatus = response.body.find(status => status.url === 'https://www.google.com');
    const amazonStatus = response.body.find(status => status.url === 'https://www.amazon.com');

    expect(googleStatus).toHaveProperty('url', 'https://www.google.com');
    expect(googleStatus).toHaveProperty('statusCode', 500);
    expect(amazonStatus).toHaveProperty('url', 'https://www.amazon.com');
    expect(amazonStatus).toHaveProperty('statusCode', 503); 
  });
});
