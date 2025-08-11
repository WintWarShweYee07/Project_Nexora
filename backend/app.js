import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

// Import routes
import authRoutes from './controller/AuthController.js';
import privateRoutes from './controller/PrivateResController.js';
import publicRoutes from './controller/PublicResController.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/private', privateRoutes);
app.use('/api/public', publicRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Backend server is running successfully!',
    status: 'OK',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/`);
  console.log(`🔐 Auth routes: http://localhost:${PORT}/api/auth`);
  console.log(`🔒 Private routes: http://localhost:${PORT}/api/private`);
  console.log(`🌐 Public routes: http://localhost:${PORT}/api/public`);
});

export default app;
