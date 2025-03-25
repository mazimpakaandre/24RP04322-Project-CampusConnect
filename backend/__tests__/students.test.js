const request = require('supertest');
const express = require('express');
const router = require('../routes/students');

const app = express();
app.use(express.json());
app.use('/api/students', router);

describe('Students API Endpoints', () => {
  test('GET /api/students should return all students', async () => {
    const response = await request(app).get('/api/students');
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('GET /api/students/:id should return 404 for non-existent student', async () => {
    const response = await request(app).get('/api/students/999');
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('error', 'Student not found');
  });

  test('POST /api/students should create new student with valid data', async () => {
    const studentData = {
      studentId: 'ST123',
      name: 'John Doe',
      email: 'john@example.com',
      course: 'Computer Science'
    };

    const response = await request(app)
      .post('/api/students')
      .send(studentData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('message', 'Student created successfully');
  });

  test('POST /api/students should return 400 for invalid data', async () => {
    const invalidData = {
      // Missing required fields
      name: 'John Doe'
    };

    const response = await request(app)
      .post('/api/students')
      .send(invalidData);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('errors');
  });
});