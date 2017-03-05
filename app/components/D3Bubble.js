const React = require('react')

const D3Bubble = React.createClass({
  getInitialState(){
    return {
      height: 500,
      width: 1100,
      stats: [
        'OBP',
        'SLG',
        'OPS',
        'AVG',
        'K/BB',
        'AB/HR',
        'HR',
        'RBI',
        'H',
        'SB',
        'CS',
        'TB'
      ],
    }
  },
  componentDidMount(){
    this.setupSVG()
  },
  setupSVG(){
    var { height, width } = this.state
    d3.select('.d3BubbleSVG')
      .attr('height', height)
      .attr('width', width)
      .style('border', '2px solid purple')

    this.setupData()
  },
  setupData(){
    var data = this.parseStats(this.props.data)
    var stats = this.state.stats
    
    var scales = {}
    stats.forEach((stat) => {
      var min = d3.min(data.map((d) => {
        if (d.stat === stat) return d.num
        return
        }
      ))
      var max = d3.max(data.map((d) => {
        if (d.stat === stat) return d.num
        return
        }
      ))
      scales[stat] = d3.scaleLinear()
        .domain([min, max])
        .range([20, 50])
    })

    this.renderData(data, stats, scales)

  },
  parseStats(data){
    var newData = []
    data.forEach((player) => {
      player.data.forEach((d) => {
        this.state.stats.forEach((stat) => {
          var obj = {name: player.name, year: d.year, stat: stat, year: d.Year, num: d[stat]}
          newData.push(obj)
        })
      })
    })
    return newData
  },
  renderData(data, stats, scales){
    d3.select('.d3BubbleSVG')
      .selectAll('.d3Bubble')
      .data(data)
      .enter()
      .append('g')
      .classed('d3Bubble', true)

    var circles = d3.selectAll('.3Bubble')
      .append('circle')
      .attr('r', (d) => scales[d.stat](d.num))

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