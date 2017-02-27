module.exports = {

  capitalize: function(input) {
    input = input.split(' ')
    return input.map((word) => {
      return word.split('').map((char, i) => {
        return i === 0 ? char.toUpperCase() : char
      }).join('')
    }).join(' ')
  }

}