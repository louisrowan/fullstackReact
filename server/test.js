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

exports.baseball = function(player){
  player = player.split(' ').join('-')
  console.log(player)
  var url = 'http://www.thebaseballcube.com/players/profile.asp?P=' + player

    function numParse(str){
      return str.split('').filter((s) => {
        if (+s || s === '.' || s === '0') return s
      }).join('')
    }

  return new Promise(function(resolve, reject){
    request(url, function(err, res, html){
      var $ = cheerio.load(html)
      var tr = $('#battingReports tr')

      var headers = []
      var done = false
      var file = []

      $(tr).each(function(i){
        if ($(this).hasClass('firstRow')) done = true
        if (done) return
        if (i > 0) var obj = {}

        $(this).children('td').each(function(index){
          var text = $(this).text()
          if (text === '') text = '-'

          if (i === 0) {
            headers.push(text)
          } else {
            var prop = headers[index]
            if (prop === 'Diff' || prop === 'GDP') return

            if (prop === 'OPS') {
              obj[prop] = (+numParse(text)/1000)
            } else if (index > 8) {
              obj[prop] = numParse(text) 
            } else {
              obj[prop] = text
            }
          }

        })

        if (obj) file.push(obj)
      })

      resolve(file)
    })
  }).then(function(p) {
    return p
  })
}