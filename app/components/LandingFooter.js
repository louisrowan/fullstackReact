const React = require('react')

const LandingFooter = React.createClass({
  getInitialState(){
    return {
      aboutSite: 'hide',
      aboutDev: 'hide'
    }
  },
  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll)
  },
  handleScroll(){
    var site = document.getElementById('aboutSite')
    site = site.getBoundingClientRect().top
    var dev = document.getElementById('aboutDev')
    dev = dev.getBoundingClientRect().top
    if (window.scrollY > site + 800){
      this.setState({ aboutSite: ''})
    }
    if (window.scrollY > dev + 800){
      this.setState({ aboutDev: ''})
      window.removeEventListener('scroll', this.handleScroll)
    }
  },
  componentWillUnmount(){
    window.removeEventListener('scroll', this.handleScroll)

  },
  render(){
    return (
      <div id='landingFooterContainer'>
        <h1>The Site</h1>

        <div id='aboutSite' className={'footerDiv ' + this.state.aboutSite}>
          <p>
            This site scrapes all data from <a target='_blank' href='http://www.thebaseballcube.com/'>The Baseball Cube</a>. Each requested player page is then parsed into a data structure that can then be used to be displayed in D3 charts.
          </p>
          <p>
            Data from anybody who played in a major league baseball game, from the 1800s to now, can be accessed.
          </p>
        </div>

        <h1>The Developer</h1>

        <div id='aboutDev' className={'footerDiv ' + this.state.aboutDev}>
        <p>
          My name is Louis Rowan, and I am a Full-Stack Developer with an interest in all things JavaScript, including React and D3. My personal portfolio site can be found <a target='_blank' href='http://www.louisrowan.com'>here</a>.
        </p>
        </div>
        
      </div>
    )
  }
})

module.exports = LandingFooter