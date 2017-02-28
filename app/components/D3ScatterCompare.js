const React = require('react')
const ScatterLegend = require('./ScatterLegend')

const D3ScatterCompare = React.createClass({
  getInitialState(){
    return {
      height: '',
      width: '',
      padding: ''
    }
  },
  compileChart(){
    const height = 600
    const width = 1000
    const padding = 10
    this.setState({ height, width, padding })

    var svg = d3.select('#container')
      .insert('svg', ":first-child")
      .attr('height', height)
      .attr('width', width)
      .classed('d3SVG', true)
  },
  renderChart(data, stats) {
    var height = this.state.height
    var width = this.state.width
    var padding = this.state.padding

    d3.select('svg').selectAll('*').remove()

    var min = d3.min(data.map((d) => {
      return d3.min(d.map((e) => {
        return d3.min(stats.map((stat) => +e[stat] ))
      }))
    }))
    var max = d3.max(data.map((d) => {
      return d3.max(d.map((e) => {
        return d3.max(stats.map((stat) => +e[stat] ))
      }))
    }))
    var xScale = d3.scaleLinear()
      .domain([0, d3.max(data.map((d) => d.length ))])
      .range([padding, width - padding])
    var yScale = d3.scaleLinear()
      .domain([min, max])
      .range([height - padding, padding])
    var yAxisScale = d3.scaleLinear()
      .domain([min, max])
      .range([height, height - padding])
    var xAxisScale = d3.scaleLinear()
      .domain([1, d3.max(data.map((d) => d.length )) + 1])
      .range([padding, width - padding])
    var xAxis = d3.axisBottom()
      .scale(xAxisScale)
      .ticks(d3.max(data.map((d) => d.length )) + 1)
    var yAxis = d3.axisLeft()
      .scale(yScale)


    d3.select('svg')
      .append('g')
      .classed('d3Axis', true)
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)

    d3.select('svg')
      .append('g')
      .classed('d3Axis', true)
      .call(yAxis)

    d3.select('svg').append("text")             
      .attr("transform",
            "translate(" + (width/2) + " ," + 
                           (height + 60) + ")")
      .style("text-anchor", "middle")
      .text("Year")

    d3.select('svg').append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", -100)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Performance")

    var rect = d3.select('svg')
      .append('g')

    rect.append('rect')
      .classed('moveableRect', true)
      .attr('x', 0)
      .attr('y', height)
      .style('fill', 'none')
      .style('stroke', 'rgb(5, 183, 35)')

    d3.select('#container')
      .append('div')
      .classed('toolTipText', true)
      .classed('toolTipYear', true)
      .text('')

    d3.select('#container')
      .append('div')
      .classed('toolTipText', true)
      .classed('toolTipNum', true)
      .text()

    data.forEach((d, index) => this.renderData(d, index, xScale, yScale, stats))
  },
  renderData(data, index, xScale, yScale, stats){
    var height = this.state.height
    var width = this.state.width

    stats.forEach((stat, statIndex) => {

      d3.select('.d3SVG').selectAll('.d3BubbleG' + index)
        .data(data)
        .enter()
        .append('g')
        .classed('d3BubbleG' + index, true) 

      var obj = d3.selectAll('.d3BubbleG' + index)
        .style('fill', (d, i) => {
          if (index === 0) {
            return 'rgba(22, 97, 247, .8)'
          } else if (index === 1) {
         
            return 'rgba(252, 30, 41, .8)'
          } else {
            return 'rgba(5, 183, 35, .8)'
          }
        })

      if (statIndex === 0) {
        obj
          .append('circle')
          .classed('solidCircle', true)
          .attr('cx', (d, i) => xScale(i + (Math.random()*2)/40))
          .attr('cy', (d, i) => {
            d.year = i + 1
            return yScale(+d[stat])}) 
          .attr('r', 4)
      } else if (statIndex === 1 ){
        obj
          .append('circle')
          .classed('transCircle', true)
          .attr('cx', (d, i) => xScale(i + (Math.random()*2)/40))
          .attr('cy', (d) => yScale(+d[stat])) 
          .attr('r', 4)
          .style('stroke', (d) => {
            if (index === 0) {
              return 'rgba(22, 97, 247, .8)'
            } else if (index === 1) {
              return 'rgba(252, 30, 41, .8)'
            } else {
              return 'rgba(5, 183, 35, .8)'
            }
          })
          .style('fill', 'transparent')
      } else {
        obj
          .append('svg')
          .attr('x', (d, i) => xScale(i) - 5)
          .attr('y', (d) => yScale(+d[stat]) - 5)
          .attr('height', 10)
          .attr('width', 10)
          .append('polygon')
          .classed('solidTriangle', true)
          .attr('points', (d, i) => '0,0 10,0 5,10' )
      }

      obj.selectAll('*').on('mouseover', function(){
        d3.select(this).style('transform', 'scale(1.5)').style('transform-origin', '50% 50%')
        var selector = d3.select(this)._groups[0][0].__data__
        var statName;
        if (d3.select(this).attr('class') === 'solidCircle'){
          statName = stats[0]
        } else if (d3.select(this).attr('class') === 'solidTriangle'){
          statName = stats[1]
        } else {
          statName = stats[2]
        }
        var statNum = selector[statName]
        var statYear = selector.year
        var tagName = this.tagName
        var rWidth;
        var rHeight;
        if (tagName === 'circle'){
          rWidth = d3.select(this).attr('cx')
          rHeight = d3.select(this).attr('cy')
        } else {
          rWidth = (+d3.select(this).attr('x') + (+d3.select(this).attr('width')/2))
          rHeight = (+d3.select(this).attr('y') + (+d3.select(this).attr('height')/2))
        }
        d3.selectAll('.toolTipYear').style('left', rWidth + 'px').style('top', height + 'px').text('Year ' + statYear).style('opacity', 1)
        d3.selectAll('.toolTipNum').style('left', '0px').style('top', rHeight + 'px').text(statNum + ' ' + statName).style('opacity', 1)
        d3.select('.moveableRect')
          .attr('height', height - rHeight)
          .attr('width', rWidth)
          .attr('y', rHeight)
        }).on('mouseout', function(){
          d3.select(this).style('transform', 'scale(1)').style('transform-origin', '50% 50%')
          d3.select('.moveableRect')
            .attr('height', 0)
            .attr('width', 0)
          d3.selectAll('.toolTipText')
            .style('opacity', 0)
        })

      var valueline = d3.line()
        .x(function(d) { return xScale(d.year - 1)})
        .y(function(d) { return yScale(d[stat])})

      d3.select('.d3SVG').append('path')
        .data([data])
        .attr('class', 'line')
        .style('stroke', () => {
          if (index === 0) {
            return 'blue' 
          } else if (index === 1) {
            return 'red'
          } else {
            return 'rgb(5, 183, 35)'
          }
        })
        .attr('d', valueline)
    })
  },
  clearChart(){
    d3.select('.d3SVG').selectAll('*').remove()
    this.renderChart(this.props.data, [])
  },
  componentDidMount(){
    var preload = function(){
      return new Promise(function(resolve, reject){
        resolve(this.compileChart())
      }.bind(this))
    }.bind(this)

    preload()
      .then(function(){
        this.renderChart(this.props.data, [])
      }.bind(this))
  },
  render(){
    return (
      <div id='container'>
        <ScatterLegend
          data={this.props.data}
          players={this.props.players}
          renderChart={this.renderChart}
          clearChart={this.clearChart}
          backToForm={this.props.backToForm} />
      </div>
    )
  }
})

module.exports = D3ScatterCompare