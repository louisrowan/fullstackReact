const express = require('express')
const port = process.env.PORT || 8080
const path = require('path')
const todos = require('./server/controllers/todos')
const api = require('./server/api')
const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
require('dotenv').config()

app = express()
require('./server/middleware')(app)


app.use(express.static(__dirname + '/dist'))
app.use(express.static(__dirname + '/public'))


app.get('/', function(req, res){
  res.sendFile(path.resolve(__dirname, './dist/index.html'))
})

app.get('/otherpage', function(req, res){
  res.sendFile(path.resolve(__dirname, './dist/otherpage.html'))
})

app.use('/api', api)




var url = 'mongodb://louisrowan:' + process.env.DBPASSWORD + '@ds011873.mlab.com:11873/reactcrud'

MongoClient.connect(url, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(port)
})


