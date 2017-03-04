const React = require('react')
const ReactCSSTransitionGroup = require('react-addons-css-transition-group')
const images = require('json-loader!../../public/data.json').images



const LandingBackground = React.createClass({
  getInitialState(){
    return {
      index: 0,
      images: images
    }
  },

  handleArrowClick(val){
    var { index, images } = this.state
    var newValue
    if (index + val >= images.length) {
      newValue = 0
    } else if (index + val < 0) {
      newValue = images.length - 1
    } else {
      newValue = index + val
    }
    console.log(newValue)
    this.setState({ index: newValue})
  },

  render(){
    var { index, images } = this.state

    return (
        <div id='carouselContainer'>

        <div
          onClick={() => this.handleArrowClick(-1)}
          className='arrow Larrow'></div>
        <div
          onClick={() => this.handleArrowClick(1)} 
          className='arrow Rarrow'></div>

        <div className='carouselImgDiv'>
          <h1>{images[index].text}</h1>
          <img src={images[index].url} />
        </div>

        </div>
    )
  }
})

module.exports = LandingBackground