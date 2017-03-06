const React = require('react')
const Util = require('../../util/Util')
const { Link } = require('react-router')
const CopyToClipboard = require('react-copy-to-clipboard')

const ScatterLegend = React.createClass({
  getInitialState(){
    return {
      allStats: [
        {name: 'OBP', type: 'average'},
        {name: 'SLG', type: 'average'},
        {name: 'OPS', type: 'average'},
        {name: 'AVG', type: 'average'},
        {name: 'K/BB', type: 'average'},
        {name: 'AB/HR', type: 'average'},
        {name: 'HR', type: 'counting'},
        {name: 'RBI', type: 'counting'},
        {name: 'H', type: 'counting'},
        {name: 'SB', type: 'counting'},
        {name: 'CS', type: 'counting'},
        {name: 'TB', type: 'counting'}
      ],
      statType: 'average',
      stats: [],
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
      return `p${i + 1}=${p.name.split(' ').join('-')}&`
    }).join('')
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
          </div>
          <br />
          <div>
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