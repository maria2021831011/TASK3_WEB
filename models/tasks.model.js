const { v4: uuidv4 } = require('uuid');

let tasks = [
  {
    id: uuidv4(),
    title: 'Write project brief',
    description: 'Summarize scope and requirements',
    status: 'To Do',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: uuidv4(),
    title: 'Implement CRUD',
    description: 'Build Express controllers and routes',
    status: 'In Progress',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

module.exports = tasks;
