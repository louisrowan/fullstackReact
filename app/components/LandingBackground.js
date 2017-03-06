const React = require('react')
const ReactCSSTransitionGroup = require('react-addons-css-transition-group')
const images = require('json-loader!../../public/data.json').images



const LandingBackground = React.createClass({
  getInitialState(){
    return {
      index: 0,
      images: images,
      carouselHidden: 'hide'
    }
  },

  componentDidMount(){
    window.addEventListener('scroll', this.showCarousel)
  },
  showCarousel(){
    var carousel = document.getElementById('carouselContainer')
    carousel = carousel.getBoundingClientRect().top
    if (carousel - window.innerHeight < -300){
      this.setState({ carouselHidden: ''})
      window.addEventListener('scroll', this.showCarousel)
    }
  },

  componentWillUnmount(){
    window.removeEventListener('scroll', this.showCarousel)
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

        <div className={'carouselImgDiv ' + this.state.carouselHidden}>
          <h1>{images[index].text}</h1>
          <img src={images[index].url} />
        </div>

        </div>
    )
  }
})

module.exports = LandingBackground