const cheerio = require('cheerio')
const request = require('request')

var baseball = function(player){
  player = player.split(' ').join('-')
  console.log(player)
  var url = 'http://www.thebaseballcube.com/players/profile.asp?P=' + player

    function numParse(str){
      return str.split('').filter((s) => {
        if (+s || s === '.' || s === '0') return s
      }).join('')
    }

  var promise = function(url){
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
          if (obj && obj.Level === 'MLB') file.push(obj)
        })
        resolve(file)
      })
    })
  }

  Promise.all([promise(url), promise(url + '-1'), promise(url + '-2')])
  .then(function(p) {
    console.log("%j", p)
    console.log(p.length)
    return p
  })
}

baseball('jose-reyes')