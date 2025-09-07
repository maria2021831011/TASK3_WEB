const router = require('express').Router();
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  completeTask
} = require('../controllers/tasks.controller');

router.post('/', createTask);                
router.get('/', getTasks);                   
router.get('/:id', getTaskById);             
router.put('/:id', updateTask);               
router.patch('/:id/complete', completeTask);  
router.delete('/:id', deleteTask);            

module.exports = router;
