const ObjectId = require('mongodb').ObjectId
const test = require('../test')

exports.param = function(req, res, next){
  req.body.id = new ObjectId(req.params.id)
  next()
}


exports.get = function(req, res, next){
  db.collection('todos').find().toArray(function(err, items){
    res.send(items)  
  })
}

exports.getOne = function(req, res, next){
  db.collection('todos').find({ _id: req.body.id}).toArray(function(err, result){
    if (err) return res.send(err)
    res.send(result[0])
  })
}

exports.put = function(req, res, next){
  test.newName(req.body.newName)
  db.collection('todos').findOneAndUpdate({ _id: req.body.id }, { $set: {
      name: req.body.newName
    }
  }, function(err, result){
    if (err) return res.send(err)
    res.send(result)
  })
}

exports.delete = function(req, res, next){
  db.collection('todos').findOneAndDelete({ _id: req.body.id }, function(err, result){
    if (err) return res.send(err)
      res.send(result)
  })
}

exports.post = function(req, res, next){
  db.collection('todos').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log(req.body, ' saved to database')
  })
  res.send(req.body)
}