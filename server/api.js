var router = require('express').Router()
var todosController = require('./controllers/todos')
var test = require('./test')

router.route('/parser')
  .post(function(req, res, next) {
    new Promise(function(resolve, reject){
      resolve(test.parse(req.body.team))
    }).then(function(promise){
      res.send(promise)
    })

  })

router.route('/baseball')
  .post(function(req, res, next) {
    new Promise(function(resolve, reject){
      resolve(test.baseball(req.body.player))
    }).then(function(p){
      res.send(p)
      if (p.length > 0) {
        test.addPlayertoDB(req.body.player)
      } 
    })
  })
  .get(function(req, res, next) {
    db.collection('players').find().toArray(function(err, items){
      res.send(items)
    })
  })

router.route('/todos')
  .get(todosController.get)
  .post(todosController.post)

router.param('id', todosController.param)

router.route('/todos/:id')
  .get(todosController.getOne)
  .put(todosController.put)
  .delete(todosController.delete)

module.exports = router