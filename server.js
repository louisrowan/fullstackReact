const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
require('dotenv').config()

app = express()






app.use(express.static(__dirname + '/dist'))
app.use(express.static(__dirname + '/public'))

app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(req, res){
  res.sendFile(path.resolve(__dirname, './dist/index.html'))
})

app.get('/bananas', function(req, res){
  res.send('hi')
})

app.get('/todos', function(req, res){
  db.collection('todos').find().toArray(function(err, items){
    res.send(items)  
  })

})

app.get('/:id', function(req, res){
  // console.log(__dirname)
  // res.sendFile(path.resolve(__dirname, './dist/index.html'))

  console.log(req.params)
  var o_id = new ObjectId(req.params.id)
  db.collection('todos').find({ _id: o_id}).toArray(function(err, result){
    if (err) return res.send(err)
    res.send(result[0])
  })
})

app.get('/otherpage', function(req, res){
  res.sendFile(path.resolve(__dirname, './dist/otherpage.html'))
})

app.put('/todos', function(req, res){
  var o_id = new ObjectId(req.body.i)
  db.collection('todos').findOneAndUpdate({ _id: o_id }, { $set: {
      name: req.body.newName
      }
  }, function(err, result){
    if (err) return res.send(err)
    res.send(result)
  })
})

app.delete('/todos', function(req, res){
  var o_id = new ObjectId(req.body.i)
  db.collection('todos').findOneAndDelete({ _id: o_id }, function(err, result){
    if (err) return res.send(err)
      res.send(result)
  })
})

app.post('/bananas', function(req, res){
  db.collection('todos').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log(req.body, ' saved to database')
  })
  res.send(req.body)
})



var url = 'mongodb://louisrowan:' + process.env.DBPASSWORD + '@ds011873.mlab.com:11873/reactcrud'

MongoClient.connect(url, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(5000)
})


