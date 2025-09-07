const { v4: uuidv4 } = require('uuid');
let tasks = require('../models/tasks.model');
const { VALID_STATUSES, validateCreate, validateUpdate } = require('../utils/validators');
function applyQuery(list, { status, search, sortBy, order }) {
  let result = [...list];

  if (status) {
    if (!VALID_STATUSES.includes(status)) return { error: `Invalid status. Use: ${VALID_STATUSES.join(', ')}` };
    result = result.filter(t => t.status === status);
  }

  if (search) {
    const q = search.toLowerCase();
    result = result.filter(t =>
      (t.title && t.title.toLowerCase().includes(q)) ||
      (t.description && t.description.toLowerCase().includes(q))
    );
  }

  if (sortBy) {
    const validSort = ['title', 'status', 'createdAt', 'updatedAt'];
    if (!validSort.includes(sortBy)) return { error: `Invalid sortBy. Use: ${validSort.join(', ')}` };
    const dir = (order || 'asc').toLowerCase() === 'desc' ? -1 : 1;
    result.sort((a, b) => {
      const A = a[sortBy] ?? '';
      const B = b[sortBy] ?? '';
      if (A < B) return -1 * dir;
      if (A > B) return 1 * dir;
      return 0;
    });
  }

  return { data: result };
}

const createTask = (req, res) => {
  const errors = validateCreate(req.body);
  if (errors.length) return res.status(400).json({ message: 'Validation failed', errors });

  const { title, description = '', status = 'To Do' } = req.body;
  const now = new Date().toISOString();

  const task = {
    id: uuidv4(),
    title: title.trim(),
    description: description.trim(),
    status,
    createdAt: now,
    updatedAt: now
  };

  tasks.push(task);
  return res.status(201).json({ message: 'Task created', task });
};

const getTasks = (req, res) => {
  const { status, search, sortBy, order } = req.query;
  const { data, error } = applyQuery(tasks, { status, search, sortBy, order });
  if (error) return res.status(400).json({ message: error });
  return res.status(200).json({ count: data.length, tasks: data });
};


const getTaskById = (req, res) => {
  const { id } = req.params;
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  return res.status(200).json({ task });
};


const updateTask = (req, res) => {
  const { id } = req.params;
  const errors = validateUpdate(req.body);
  if (errors.length) return res.status(400).json({ message: 'Validation failed', errors });

  let found = false;
  tasks = tasks.map(t => {
    if (t.id !== id) return t;
    found = true;
    const updated = { ...t };
    if (req.body.title !== undefined) updated.title = req.body.title.trim();
    if (req.body.description !== undefined) updated.description = String(req.body.description).trim();
    if (req.body.status !== undefined) updated.status = req.body.status;
    updated.updatedAt = new Date().toISOString();
    return updated;
  });

  if (!found) return res.status(404).json({ message: 'Task not found' });
  const task = tasks.find(t => t.id === id);
  return res.status(200).json({ message: 'Task updated', task });
};


const completeTask = (req, res) => {
  const { id } = req.params;
  let found = false;
  tasks = tasks.map(t => {
    if (t.id !== id) return t;
    found = true;
    return { ...t, status: 'Completed', updatedAt: new Date().toISOString() };
  });
  if (!found) return res.status(404).json({ message: 'Task not found' });
  const task = tasks.find(t => t.id === id);
  return res.status(200).json({ message: 'Task marked as completed', task });
};


const deleteTask = (req, res) => {
  const { id } = req.params;
  const before = tasks.length;
  tasks = tasks.filter(t => t.id !== id);
  if (tasks.length === before) return res.status(404).json({ message: 'Task not found' });
  return res.status(200).json({ message: 'Task deleted' });
};

module.exports = { createTask, getTasks, getTaskById, updateTask, deleteTask, completeTask };
