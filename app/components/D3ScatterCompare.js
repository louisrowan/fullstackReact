const React = require('react')
const $ = require('jquery')

const D3ScatterCompare = React.createClass({
  getInitialState(){
    return {
      stats: []
    }
  },
  compileChart(){
    const height = 500
    const width = 1000

    var svg = d3.select('#container')
      .insert('svg', ":first-child")
      .attr('height', height)
      .attr('width', width)
      .style('overflow', 'visible')
      .style('padding', '40px')
      .classed('d3SVG', true)

      const radius = 20
      const padding = 30

      var data = this.props.data

      function renderData(data, index, xScale, yScale, stats){
    
        stats.forEach((stat, statIndex) => {

          var valueline = d3.line()
      .x(function(d) { return xScale(d.year - 1)})
      .y(function(d) { return yScale(d[stat])})

    svg.append('path')
      .data([data])
      .attr('class', 'line')
      .style('stroke', () => {
        if (index === 0) {
          return 'blue' 
        } else if (index === 1) {
          return 'red'
        } else {
          return 'yellow'
        }
      })
      .attr('d', valueline)

          svg.selectAll('.d3BubbleG' + index)
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
                return 'rgba(237, 252, 30, .8)'
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
              .attr('r', 8)
          } else if (statIndex === 1 ){
              obj
                .append('rect')
                .classed('solidRect', true)
                .attr('x', (d, i) => xScale(i + (Math.random()*2)/40))
                .attr('y', (d) => yScale(+d[stat])) 
                .attr('height', 12)
                .attr('width', 12)
          } else {
            obj
            .append('circle')
            .classed('transCircle', true)
            .attr('cx', (d, i) => xScale(i + (Math.random()*2)/40))
            .attr('cy', (d) => yScale(+d[stat])) 
            .attr('r', 8)
            .style('stroke', (d) => {
              if (index === 0) {
                return 'rgba(22, 97, 247, .8)'
              } else if (index === 1) {
                return 'rgba(252, 30, 41, .8)'
              } else {
                return 'rgba(237, 252, 30, .8)'
              }
            })
            .style('fill', 'transparent')
          }

          obj.selectAll('*').on('mouseover', function(){
            d3.select(this).style('transform', 'scale(1.5)').style('transform-origin', '50% 50%')
            var selector = d3.select(this)._groups[0][0].__data__
            var statName;
            if (d3.select(this).attr('class') === 'solidCircle'){
              statName = stats[0]
            } else if (d3.select(this).attr('class') === 'solidRect'){
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


        })
       // end of looping through all stats

      }
      // end of renderData

      function renderChart(data, stats) {
        console.log('in render chart d3', data, stats)
        d3.select('svg').selectAll('*').remove()

        console.log('gonna check min')

        var min = d3.min(data.map((d) => {
          return d3.min(d.map((e) => {
            return d3.min(stats.map((stat) => {
              console.log(e, stat)
              return +e[stat] }))
          }))
        }))

        var max = d3.max(data.map((d) => {
          return d3.max(d.map((e) => {
            return d3.max(stats.map((stat) => +e[stat]))
          }))
        }))

        console.log(min, max, 'gonna do scales')

        var xScale = d3.scaleLinear()
          .domain([0, d3.max(data.map((d) => d.length))])
          .range([padding, width - padding])

        var yScale = d3.scaleLinear()
          .domain([min, max])
          .range([height - padding, padding])

        var yAxisScale = d3.scaleLinear()
          .domain([min, max])
          .range([height, height - padding])

        var xAxisScale = d3.scaleLinear()
          .domain([1, d3.max(data.map((d) => d.length)) + 1])
          .range([padding, width - padding])


        var xAxis = d3.axisBottom()
          .scale(xAxisScale)
          .ticks(d3.max(data.map((d) => d.length)) + 1)

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

        var rect = d3.select('svg')
          .append('g')

        rect.append('rect')
          .classed('moveableRect', true)
          .attr('x', 0)
          .attr('y', height)
          .style('fill', 'none')
          .style('stroke', 'yellow')

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


    
        data.forEach((d, index) => renderData(d, index, xScale, yScale, stats))
      }

    var that = this
    $('#hr').on('click', function(){
      that.setState({ stats: ['HR', 'H', 'RBI']})
      renderChart(data, ['HR', 'H', 'RBI'])
    })

    $('#slg').on('click', function(){
      that.setState({ stats: ['SLG', 'OPS', 'OBP']})
      renderChart(data, ['SLG', 'OPS', 'OBP'])
    })

  },
  componentDidMount(){
    this.compileChart()
  },
  render(){
    var statsKey;
    if (this.state.stats){
      statsKey = this.state.stats.map((s, i) => {
        if (i === 0){
          return <tr key={i}><td>{s}</td><td><svg className='keySVG'><circle className='keyFullCircle'></circle></svg></td></tr>
        } else if (i === 1){
          return <tr key={i}><td>{s}</td><td><svg className='keySVG'><rect className='keyRect'></rect></svg></td></tr>
        } else {
          return <tr key={i}><td>{s}</td><td><svg className='keySVG'><circle className='keyTransCircle'></circle></svg></td></tr>
        }
      })
    } else {
      statsKey = ''
    }
    var playerKey = this.props.players.map((p, i) => <li className={'playerKey' + i} key={i}>{p}</li>)
    return (
      <div id='container'>
        <br />

        <div id='d3LegendDiv'>
          <div>
            <table><tbody>{statsKey}</tbody></table>
          </div>
          <div>
            <ul>{playerKey}</ul>
          </div>
          
          <div>
            <button id='hr'>HR, H, RBI</button><br />
            <button id='slg'>OBP, SLG and OPS</button>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = D3ScatterCompare