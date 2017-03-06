var fs = require('fs')
var request = require('request')
var cheerio = require('cheerio')

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

function cleanupYear(year){
  var count = 0
  year = year.split('')
  year.forEach((e, i) => {
    if (parseInt(e) >= 0) {
      count += 1
    } else {
      count = 0
    }
    if (count === 4) {
      returnVal = year.splice(i-3, 4)
    }
  })
  return returnVal.join('')
}

function parsePlayerInfo($){
  var position, born
  var profileRow = $('.profileGrid2 tr')
  $(profileRow).each(function(i){
    $(this).children('td').each(function(index){
      if ($($(profileRow[i]).children('td')[index]).text() === 'Positions:') {
        position = findMax($($(profileRow[i]).children('td')[index + 1]).text())
      }
      if ($($(profileRow[i]).children('td')[index]).text() === 'Born:') {
        born = cleanupYear($($(profileRow[i]).children('td')[index + 1]).text())
      }
    })
  })
  return [position, born]
}

function statParse($){
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
  return careerArray
}

function numParse(str){
  return str.split('').filter((s) => {
    if (+s || s === '.' || s === '0') return s
  }).join('')
}

exports.baseballCubeParse = function(player, id){
  var pName = player
  player = player.split(' ').join('-')
  console.log(player)
  var url = 'http://www.thebaseballcube.com/players/profile.asp?P=' + player



  var promise = function(url, id){
        id = id || '0'
      return new Promise(function(resolve, reject){
        var param = id === '0' ? '' : id
        request(url + param, function(err, res, html){

        var $ = cheerio.load(html)
        var parsedInfo = parsePlayerInfo($)
        var position = parsedInfo[0]
        var born = parsedInfo[1]
        var careerArray = statParse($)

        resolve({data: careerArray, position: position, born: born, id: id, name: pName})
      })
    })
  }

  if (id === undefined) {
    return Promise.all([promise(url), promise(url, '-1'), promise(url, '-2'), promise(url, '-3'), promise(url, '-4'), promise(url, '-5')])
    .then(function(response) {
      var returnVal = response.filter((arr) => arr.data.length > 0)
      return returnVal
    })
  } else {
    return promise(url, id)
      .then(function(response) {
        return response
      })
  }
}

exports.addPlayertoDB = function(name){
  db.collection('players').find({ name: name }).toArray(function(err, result){
    if (err) return console.log('error: ', err)
    if (result.length === 0){
      db.collection('players').save({ name: name}, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to DB: ', result)
      })
    }
  })
}