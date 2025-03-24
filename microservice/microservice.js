require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const winston = require('winston');
const amqp = require('amqplib');
const { expressjson } = require('express');

// Initialize Express app
const app = express();

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Message queue connection
let channel;
async function connectQueue() {
  try {
    const amqpServer = process.env.RABBITMQ_URL || 'amqp://localhost:5672';
    const connection = await amqp.connect(amqpServer);
    channel = await connection.createChannel();
    await channel.assertQueue('student_updates');
    
    logger.info('Connected to RabbitMQ');
  } catch (error) {
    logger.error('RabbitMQ connection error:', error);
  }
}
connectQueue();

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Student attendance endpoint
app.post('/api/attendance', async (req, res) => {
  try {
    const { studentId, classId, status } = req.body;
    
    // Validate input
    if (!studentId || !classId || !status) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Process attendance and send update to queue
    const attendanceData = {
      studentId,
      classId,
      status,
      timestamp: new Date().toISOString()
    };
    
    if (channel) {
      channel.sendToQueue(
        'student_updates',
        Buffer.from(JSON.stringify(attendanceData))
      );
    }
    
    res.status(200).json({
      message: 'Attendance recorded successfully',
      data: attendanceData
    });
  } catch (error) {
    logger.error('Attendance processing error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : err.message
  });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  logger.info(`Microservice running on port ${PORT}`);
});

module.exports = app; // For testing purposes