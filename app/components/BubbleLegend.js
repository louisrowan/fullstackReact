const React = require('react')
const Util = require('../../util/Util')
const { Link } = require('react-router')

const BubbleLegend = React.createClass({
  render(){
    var statsSelector = this.props.stats.map((stat) => {
      return <tr key={stat}><td><button id={stat}>{stat}</button></td></tr>
    })

    var playerKey = this.props.players.map((p, i) => <tr className={'playerKey' + i} key={i}><td>{Util.capitalize(p)}</td></tr>)

    return (
      <div id='d3BubbleDiv'>
        <div>
          <table>
            <tbody>
              {statsSelector}
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
        <br />
        <div>
          <Link to='/'>
          <button id='backButton' >Back to player selection</button>
          </Link>
        </div>       
      </div>
    )
  }
})

module.exports = BubbleLegend