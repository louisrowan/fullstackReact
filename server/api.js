var router = require('express').Router()
var parse = require('./parse')


router.route('/baseball')
  .post(function(req, res, next) {
    new Promise(function(resolve, reject){
      resolve(parse.baseballCubeParse(req.body.player))
    }).then(function(p){
      res.send(p)
      if (Array.isArray(p)) p = p[0]
        console.log(p.data.length, p.name)
      if (p.data.length > 0) {
        parse.addPlayertoDB(p.name)
      } 
    })
  })
  .get(function(req, res, next) {
    db.collection('players').find().toArray(function(err, items){
      res.send(items)
    })
  })


module.exports = router