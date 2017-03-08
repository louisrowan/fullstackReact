const React = require('react')
const icon = require('json-loader!../../public/data.json').arrow
const ReactCSSTransitionGroup = require('react-addons-css-transition-group')

const MainHeader = React.createClass({
  getInitialState(){
    return {
      arrow: ''
    }
  },
  componentDidMount(){
    window.addEventListener('scroll', this.showArrow) 
  },
  componentWillUnmount(){
    window.removeEventListener('scroll', this.showArrow)
  },
  showArrow(){
    if (window.scrollY > 300 && this.state.arrow === '') {
      this.setState({ arrow: 'hideArrow'})
      window.removeEventListener('scroll', this.showArrow)
    }
  },
  arrowClick(){
    window.scrollTo(0, 800)
  },
  render(){
    return (
      <div id='mainHeaderDiv'>

        <ReactCSSTransitionGroup
        transitionName='headerAppearDown'
        transitionEnter={false}
        transitionLeave={false}
        transitionAppear={true}
        transitionAppearTimeout={1000}>
          <h1>MLB Graphs</h1>
        </ReactCSSTransitionGroup>

        <ReactCSSTransitionGroup
        transitionName='headerAppearUp'
        transitionEnter={false}
        transitionLeave={false}
        transitionAppear={true}
        transitionAppearTimeout={1000}>
          <h3>Built by Louis Rowan</h3>
          <h3>Data scraped from theBaseballCube.com</h3>
        </ReactCSSTransitionGroup>

        <img
          onClick={this.arrowClick}
          id='downArrowImg'
          src={icon}
          className={this.state.arrow} />
      </div>
    )
  }
})

module.exports = MainHeader