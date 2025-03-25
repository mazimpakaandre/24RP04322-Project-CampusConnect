const request = require('supertest');
const express = require('express');
const app = express();

// Mock attendance route and middleware
app.use(express.json());

app.post('/api/attendance', (req, res) => {
  const { studentId, classId, timestamp } = req.body;

  // Basic validation
  if (!studentId || !classId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Mock successful attendance record
  res.status(201).json({
    success: true,
    data: { studentId, classId, timestamp: timestamp || new Date().toISOString() }
  });
});

describe('Attendance API Endpoints', () => {
  test('should record attendance successfully', async () => {
    const attendanceData = {
      studentId: '12345',
      classId: 'CS101',
      timestamp: '2024-01-20T10:00:00Z'
    };

    const response = await request(app)
      .post('/api/attendance')
      .send(attendanceData);

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body.data).toMatchObject(attendanceData);
  });

  test('should return 400 for missing required fields', async () => {
    const invalidData = {
      studentId: '12345'
      // Missing classId
    };

    const response = await request(app)
      .post('/api/attendance')
      .send(invalidData);

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});