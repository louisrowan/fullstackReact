const React = require('react')
const Util = require('../../util/Util')
const { Link } = require('react-router')
const CopyToClipboard = require('react-copy-to-clipboard')

const ScatterLegend = React.createClass({
  getInitialState(){
    return {
      allStats: [
        {name: 'OBP', type: 'average', checked: true},
        {name: 'SLG', type: 'average', checked: false},
        {name: 'OPS', type: 'average', checked: false},
        {name: 'AVG', type: 'average', checked: false},
        {name: 'K/BB', type: 'average', checked: false},
        {name: 'AB/HR', type: 'average', checked: false},
        {name: 'HR', type: 'counting', checked: false},
        {name: 'RBI', type: 'counting', checked: false},
        {name: 'H', type: 'counting', checked: false},
        {name: 'SB', type: 'counting', checked: false},
        {name: 'CS', type: 'counting', checked: false},
        {name: 'TB', type: 'counting', checked: false}
      ],
      statType: 'average',
      stats: ['OBP'],
      value: this.getUrl(),
      copied: false
    }
  },
  showCounting(){
    this.setState({ statType: 'counting', stats: [] })
    this.props.clearChart()
  },
  showAverages(){
    this.setState({ statType: 'average', stats: [] })
    this.props.clearChart()
  },
  handleCheckClick(e){
    this.styleLegendforFirefox()
    if (e.target.value === 'OBP'){
      var newState = Object.assign([], this.state.allStats)
      newState.forEach((s) => {
        if (s.name === 'OBP')
          s.checked = false
      })
     this.setState({ allStats: newState})
    }
    var index = this.state.stats.indexOf(e.target.value)
    var stats = this.state.stats
    if (index >= 0){
      stats.splice(index, 1)
    } else {
      stats.push(e.target.value)
    }
    this.setState({ stats })
    var data = this.props.data.map((d) => d.data)
    this.props.renderChart(data, this.state.stats)
  },
  handleDisabled(e){
    if (this.state.stats.length >= 3 && this.state.stats.indexOf(e) < 0) {
      return true
    } else {
      return false
    }
  },
  handleCopy(e){
    e.preventDefault()
    this.setState({ copied: true })
  },
  getUrl(){
    return window.location.origin + '/#/scatter?' + this.props.data.map((p, i) => {
      return `p${i + 1}=${p.name.split(' ').join('-')}_${p.id}&`
    }).join('')
  },
  styleLegendforFirefox(){
    var filled = d3.select('.keyFullCircle')
    if (filled) {
      filled
      .attr('r', 10)
      .attr('cx', 10)
      .attr('cy', 10)
    }
    var trans = d3.select('.keyTransCircle')
    if (trans){
      trans
      .attr('r', 10)
      .attr('cx', 10)
      .attr('cy', 10)
    }
  },
  componentDidMount(){
    this.styleLegendforFirefox()
  },
  render(){
    var playerKey = this.props.players.map((p, i) => <tr className={'playerKey' + i} key={i}><td>{Util.capitalize(p)}</td></tr>)

    var statsSelector = this.state.allStats.filter((stat) => {
      return stat.type === this.state.statType
    }).map((stat) => {
      var index = this.state.stats.indexOf(stat.name)
      var icon;
        if (index === 0){
          icon = <td key={stat.name}><div className='keySymbolDiv'><svg className='keySVG'><circle className='keyFullCircle'></circle></svg></div></td>
        } else if (index === 1){
          icon = <td key={stat.name}><div className='keySymbolDiv'><svg className='keySVG'><circle className='keyTransCircle'></circle></svg></div></td>
        } else  if (index === 2){
          icon = <td key={stat.name}><div className='keySymbolDiv'><div className='keyTriangle'></div></div></td>
        } else {
          icon = <td><div className='keySymbolDiv'></div></td>
        }
      return (
        <tr key={stat.name}>
          <td>
            <input
              defaultChecked={stat.checked}
              disabled={this.handleDisabled(stat.name)}
              type='checkbox'
              value={stat.name}
              onClick={(e)=> this.handleCheckClick(e)} />
          </td>
          <td>
            {stat.name}
          </td>
          {icon}
        </tr>
      )
    })


    var maxStats;
    if (this.state.stats.length >= 3) {
      maxStats = <tr><td colSpan='3' id='maxMetricsTd'>Max of 3 metrics at a time</td></tr>
    } else {
      maxStats = <tr></tr>
    }

    return (
        <div id='d3LegendDiv'>
          <div>
            <table>
              <tbody>
                <tr>
                  <th colSpan='3'>
                    
                    <span className={'legendHeaderDiv ' + (this.state.statType === 'average' ? 'inactiveButton' : 'activeButton') } onClick={()=> this.showCounting()}>Counting</span>
                    
                    <span className={'legendHeaderDiv ' + (this.state.statType === 'counting' ? 'inactiveButton' : 'activeButton') }onClick={()=> this.showAverages()}>Averages</span>
                   
                  </th>
                </tr>
                {statsSelector}
                {maxStats}
              </tbody>
            </table>
          </div>
          <br />
          <div>
            <table>
              <tbody>
                <tr>
                  <th>Legend</th>
                </tr>
                {playerKey}
              </tbody>
            </table>
          </div>
          <br />
          <div>
            <CopyToClipboard text={this.state.value} onCopy={this.onCopy} >
            <button>Copy Chart URL</button>
            </CopyToClipboard>
            <Link to='/bubble'>
              <button>Bubble Chart</button>
            </Link>
            <Link to='/'>
              <button id='backButton' >Back to player selection</button>
            </Link>
          </div>
        </div>
    )
  }
})

module.exports = ScatterLegend