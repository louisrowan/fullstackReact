var fs = require('fs')
var request = require('request')
var cheerio = require('cheerio')

exports.newName = function(param){
  console.log(param.toUpperCase())
}

exports.parse = function(){
  var url = 'http://www.cfbdatawarehouse.com/data/active/n/north_texas/index.php'


  return new Promise(function(resolve, reject){
      request(url, function(err, res, html){
          var $ = cheerio.load(html)
          var tags = $('img')[0]
          var coach = $(tags).attr('alt')
          resolve(coach)
      })
  }).then(function(response){
    return response
  })


     
      
}