const React = require('react')

const ScatterLegend = React.createClass({
  getInitialState(){
    return {
      allStats: [
        {name: 'OBP', type: 'average'},
        {name: 'SLG', type: 'average'},
        {name: 'OPS', type: 'average'},
        {name: 'AVG', type: 'average'},
        {name: 'HR', type: 'counting'},
        {name: 'RBI', type: 'counting'},
        {name: 'H', type: 'counting'},
        {name: 'SB', type: 'counting'}
      ],
      statType: 'average',
      stats: [] 
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
    this.props.renderChart(this.props.data, this.state.stats)
  },
  render(){
    var playerKey = this.props.players.map((p, i) => <tr className={'playerKey' + i} key={i}><td>{p}</td></tr>)

    var statsSelector = this.state.allStats.filter((stat) => {
      return stat.type === this.state.statType
    }).map((stat) => {
      var index = this.state.stats.indexOf(stat.name)
      var icon;
        if (index === 0){
          icon = <td key={stat.name}><svg className='keySVG'><circle className='keyFullCircle'></circle></svg></td>
        } else if (index === 1){
          icon = <td key={stat.name}><div className='keyTriangle'></div></td>
        } else  if (index === 2){
          icon = <td key={stat.name}><svg className='keySVG'><circle className='keyTransCircle'></circle></svg></td>
        } else {
          icon = <td></td>
        }
      return (
        <tr key={stat.name}>
          <td>
            <input type='checkbox' value={stat.name} onClick={(e)=> this.handleCheckClick(e)} />
          </td>
          <td>
            {stat.name}
          </td>
          {icon}
        </tr>
      )
    })
    return (
        <div id='d3LegendDiv'>
          <div>
            <table>
              <tbody>
                <tr>
                  <th>
                    <button className={ this.state.statType === 'average' ? 'inactiveButton' : 'activeButton' } onClick={()=> this.showCounting()}>Counting</button>
                  </th>
                  <th>
                    <button className={ this.state.statType === 'counting' ? 'inactiveButton' : 'activeButton' }onClick={()=> this.showAverages()}>Averages</button>
                  </th>
                </tr>
                {statsSelector}
              </tbody>
            </table>
          </div>
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
        </div>
    )
  }
})

module.exports = ScatterLegend