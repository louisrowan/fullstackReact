const React = require('react')

const LandingBackground = React.createClass({
  render(){
    var url = 'https://media-cdn.tripadvisor.com/media/photo-s/07/56/5f/16/love-ya-fenway-park.jpg'
    return (
        <div id='backgroundImage'>
          <img src={url} />
          <div id='backgroundTint'></div>
        </div>
    )
  }
})

module.exports = LandingBackground