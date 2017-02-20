var router = require('express').Router()
var todosController = require('./controllers/todos')

router.route('/todos')
  .get(todosController.get)
  .post(todosController.post)

router.route('/todos/:id')
  .get(todosController.getOne)
  .put(todosController.put)
  .delete(todosController.delete)

module.exports = router