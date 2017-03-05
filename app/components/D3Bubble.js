const React = require('react')

const D3Bubble = React.createClass({
  getInitialState(){
    return {
      height: 500,
      width: 1100
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
    var { stats } = this.props
    
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
        this.props.stats.forEach((stat) => {
          var obj = {name: player.name, year: d.year, stat: stat, year: d.Year, num: +d[stat]}
          newData.push(obj)
        })
      })
    })
    return newData
  },
  renderData(data, stats, scales){
    var { height, width } = this.state
    var { players } = this.props

    d3.select('.d3BubbleSVG')
      .selectAll('.d3Bubble')
      .data(data)
      .enter()
      .append('g')
      .classed('d3Bubble', true)

    var circles = d3.selectAll('.d3Bubble')
      .append('circle')
      .attr('r', (d) => scales[d.stat](d.num))
      .style('fill', (d) => {
        var index = players.indexOf(d.name)
        if (index === 0){
          return 'red'
        } else if (index === 1) {
          return 'blue'
        } else {
          return 'green'
        }
      })
      .classed('d3Circle', true)

    var forceXNormal = d3.forceY((d) => {
      return -2*width
    }).strength(0.02)

    var forceYNormal = d3.forceY((d) => {
      return height/2
    }).strength(0.02)

    var simulation = d3.forceSimulation()
      .force('x', forceXNormal)
      .force('y', forceYNormal)
      .force('collide', d3.forceCollide((d) => {
        return scales[d.stat](d.num) + 2
      }))

    var forceXCustom = function(stat){
      return d3.forceX((d) => {
        if (d.stat === stat){
          return width/2
        } else {
          return -2*width
        }
      }).strength(0.02)
    }

    simulation.nodes(data)
      .on('tick', ticked)

    function ticked(){
      circles
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y)
    }

    stats.forEach((stat) => {
      d3.select('#hi')
        .append('button')
        .attr('id', stat)
        .text(stat)
    })

    d3.selectAll('button').on('click', function(){
      var id = this.id

      simulation
        .force('x', forceXCustom(id))
        .force('y', forceYNormal)
        .alphaTarget(0.5)
        .restart()
    })

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