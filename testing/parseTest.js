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


        var positions;
        var born;
        var profileRow = $('.profileGrid2 tr')
        $(profileRow).each(function(i){
          $(this).children('td').each(function(index){
            if ($($(profileRow[i]).children('td')[index]).text() === 'Positions:') {
              positions = $($(profileRow[i]).children('td')[index + 1]).text()
            }
            if ($($(profileRow[i]).children('td')[index]).text() === 'Born:') {
              born = $($(profileRow[i]).children('td')[index + 1]).text()
            }
          })
        })
      

        if (positions) console.log('position:' , positions)
        if (born) console.log('born:' , born)


        function findMax(str){
          var obj = {}
          str = str.split(', ').forEach((duo) => {
            duo = duo.split('-')
            obj[duo[0]] = duo[1]
          })
          
          var largest = 0
          var position;
          Object.keys(obj).forEach((key) => {
            if (+obj[key] > largest) {
              largest = +obj[key]
              position = key
            }
          })
          return position
        }

        var position;
        if (positions) position = findMax(positions)
        console.log(position) 











        var tr = $('#battingReports tr')

        var headers = []
        var done = false
        var careerArray = []

        $(tr).each(function(i){
          if ($(this).hasClass('firstRow')) done = true
          if (done) return
          if (i > 0) var yearObj = {}

          $(this).children('td').each(function(index){
            var text = $(this).text()
            if (text === '') text = '-'

            if (i === 0) {
              headers.push(text)
            } else {
              var prop = headers[index]
              if (prop === 'Diff' || prop === 'GDP') return

              if (prop === 'OPS') {
                yearObj[prop] = (+numParse(text)/1000)
              } else if (index > 8) {
                yearObj[prop] = numParse(text) 
              } else {
                yearObj[prop] = text
              }
            }

          })
          if (yearObj && yearObj.Level === 'MLB') careerArray.push(yearObj)
        })
        resolve(careerArray)
      })
    })
  }

  return Promise.all([promise(url), promise(url + '-1'), promise(url + '-2')])
  .then(function(response) {
    var returnVal = response.filter((arr) => arr.length > 0)
    return returnVal
  })
}

baseball('ken griffey')