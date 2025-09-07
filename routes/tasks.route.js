const router = require('express').Router();
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  completeTask
} = require('../controllers/tasks.controller');

router.post('/', createTask);                 // Create
router.get('/', getTasks);                    // Read all
router.get('/:id', getTaskById);              // Read one
router.put('/:id', updateTask);               // Update
router.patch('/:id/complete', completeTask);  // Mark completed
router.delete('/:id', deleteTask);            // Delete

module.exports = router;
