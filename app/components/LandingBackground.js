const React = require('react')
const ReactCSSTransitionGroup = require('react-addons-css-transition-group')

const LandingBackground = React.createClass({
  getInitialState(){
    return {
      index: 0,
      interval: '',
      urls: [
    'https://media-cdn.tripadvisor.com/media/photo-s/07/56/5f/16/love-ya-fenway-park.jpg',
    'http://www.ballparksofbaseball.com/wp-content/uploads/2016/03/yank10954.jpg',
    'http://thedailydeelight.com/wp-content/uploads/2016/06/camden-yards.jpg'
      ]
    }
  },
  componentDidMount(){
    var interval = setInterval(function(){
      var next;
      if (this.state.index === this.state.urls.length - 1) {
        next = 0
      } else {
        next = this.state.index + 1
      }
      this.setState({ index: next})
    }.bind(this), 4000)
    this.setState({ interval })
  },
  componentWillUnmount(){
    clearInterval(this.state.interval)
  },
  render(){
    var { urls, index } = this.state

    var content = urls.map((url, i) => {
      return <img key={i} src={url} />
    })
    return (
        <div id='backgroundImage'>

            {content[index]}

          <div id='backgroundTint'></div>
        </div>
    )
  }
})

module.exports = LandingBackground