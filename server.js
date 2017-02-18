const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

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
  res.send(todos)
})

app.post('/bananas', function(req, res){
  todos.push(req.body)
  res.send(req.body)
})

app.listen(5000)