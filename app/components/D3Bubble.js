const React = require('react')

const D3Bubble = React.createClass({
  getInitialState(){
    return {
      height: 500,
      width: 1100
    }
  },
  renderChart(){
    var { height, width } = this.state
    d3.select('.d3BubbleSVG')
      .attr('height', height)
      .attr('width', width)
      .style('border', '2px solid purple')
  },
  componentDidMount(){
    this.renderChart()
  },
  render(){
    return (
      <div>
        <svg className='d3BubbleSVG'></svg>
      </div>
    )
  }
})

module.exports = D3Bubble