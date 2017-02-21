var fs = require('fs')
var request = require('request')
var cheerio = require('cheerio')

exports.newName = function(param){
  console.log(param.toUpperCase())
}

exports.parse = function(team){
  team = team.split(' ').join('_').toLowerCase()
  var url = 'http://www.cfbdatawarehouse.com/data/active/' + team[0] + '/' + team + '/index.php'


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

exports.baseball = function(){
  var url = 'http://www.thebaseballcube.com/players/profile.asp?P=babe-ruth'
  return new Promise(function(resolve, reject){
    request(url, function(err, res, html){
      var $ = cheerio.load(html)
      var tr = $('#battingReports tr')

      var i = 0
      var headers = []
      var done = false
      var file = []

      $(tr).each(function(){
        if ($(this).hasClass('firstRow')) {
          done = true
        }
        if (done) return

        if (i > 0) var obj = {}

        $(this).children('td').each(function(index){
          var text = $(this).text()
          if (i === 0) {
            headers.push(text)
          } else {
            var prop = headers[index]
            obj[prop] = text
          }
        })
        i += 1
        if (obj) file.push(obj)
      })
      fs.writeFile('./fs.txt', file, function(err){
        if (err) console.log(err)
      })

      resolve(file)
    })
  }).then(function(p) {
    return p
  })
}