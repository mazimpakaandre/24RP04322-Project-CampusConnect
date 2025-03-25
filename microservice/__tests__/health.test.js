const request = require('supertest');
const express = require('express');
const app = express();

// Mock health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

describe('Health Check Endpoint', () => {
  test('should return 200 OK', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
  });
});