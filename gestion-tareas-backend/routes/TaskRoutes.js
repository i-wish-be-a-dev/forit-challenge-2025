const express = require('express');
const router = express.Router();
const taskController = require('../controllers/TaskController.js');

router.get('/', taskController.getTasks);

router.get('/state/:state', taskController.getTasksByState);

router.post('/', taskController.createTask);

router.route('/:id')
  .get(taskController.getTaskDetails)
  .delete(taskController.deleteTask)
  .put(taskController.updateTask);
 
router.put('/:id/finish',taskController.finishTask);

module.exports = router;