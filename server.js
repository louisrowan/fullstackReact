const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

app = express()

todos = [
  {name: 'mow lawn'},
  {name: 'call mom'}

]







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
    console.log(items)
    res.send(items)  
  })

})

app.post('/bananas', function(req, res){
  db.collection('todos').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log(req.body, ' saved to database')
  })
  res.send(req.body)
})


var url = 'mongodb://louisrowan:mongo@ds011873.mlab.com:11873/reactcrud'

MongoClient.connect(url, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(5000)
})


