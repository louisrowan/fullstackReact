const React = require('react')
const Util = require('../../util/Util')

const D3Bubble = React.createClass({
  getInitialState(){
    return {
      height: 700,
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

    d3.select('#bubbleContainerDiv')
      .append('div')
      .classed('toolTipDiv', true)
      .text()

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
          var obj = {name: player.name, stat: stat, year: d.Year, num: +d[stat]}
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
      .attr('cx', 400)
      .attr('cy', 400)
      .style('stroke', 'black')
      .style('stroke-width', '1px')
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

    circles.on('mouseover', function(circle){
      var radius = d3.select(this).attr('r')
      d3.select('.toolTipDiv')
        .style('left', () => circle.x + 350 + 'px')
        .style('top', () => circle.y - +radius - 45 + 'px')
        .html(`<p>${Util.capitalize(circle.name)}:</p><p>${circle.num} ${circle.stat} in ${circle.year}</p>`)
        .style('opacity', 1)
        .style('z-index', 10)
      d3.select(this)
        .style('stroke-width', '3px')
    }).on('mouseout', function(circle){
      d3.select('.toolTipDiv')
        .style('opacity', 0)
        .style('z-index', 0)
      d3.select(this)
        .style('stroke-width', '1px')
    })

    var forceYNormal = d3.forceY((d) => {
      return height/2
    }).strength(0.03)

    var forceXCustom = function(stat){
      return d3.forceX((d) => {
        if (d.stat === stat){
          return width/2
        } else {
          return -2*width
        }
      }).strength(0.02)
    }

    var simulation = d3.forceSimulation()
      .force('x', forceXCustom('OBP'))
      .force('y', forceYNormal)
      .force('collide', d3.forceCollide((d) => {
        return scales[d.stat](d.num) + 2
      }))

    simulation.nodes(data)
      .on('tick', ticked)

    function ticked(){
      circles
        .attr('cx', (d) => d.x)
        .attr('cy', (d) => d.y)
    }

    d3.selectAll('button').on('click', function(e){
      d3.selectAll('.d3BubbleButtons')
        .classed('bubbleActive', false)
      d3.select(this).classed('bubbleActive', true)
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
      <div id='bubbleContainerDiv'>
        <svg className='d3BubbleSVG'></svg>
      </div>
    )
  }
})

module.exports = D3Bubble