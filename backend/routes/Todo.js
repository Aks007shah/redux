const express = require('express');
const router = express.Router();
const TodoController = require('../controllers/Todo');

router.route('/').get(TodoController.getAllTodos);
router.route('/add').post(TodoController.addTodo);
router.route('/delete').post(TodoController.deleteTodo);


module.exports = router;