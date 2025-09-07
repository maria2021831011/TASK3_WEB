const express = require('express');
const cors = require('cors');
const tasksRouter = require('./routes/tasks.route');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/', (req, res) => {
  res.json({ name: 'Task Manager API', status: 'OK', version: '1.0.0' });
});

// Routes
app.use('/api/tasks', tasksRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Something broke' });
});

module.exports = app;
