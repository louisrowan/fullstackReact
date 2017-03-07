const React = require('react')
const Util = require('../../util/Util')
const { Link } = require('react-router')
const CopyToClipboard = require('react-copy-to-clipboard')

const BubbleLegend = React.createClass({
  getInitialState(){
    return {
      value: this.getUrl(),
      copied: false
    }
  },
  getUrl(){
    return window.location.origin + '/#/bubble?' + this.props.data.map((p, i) => {
      return `p${i + 1}=${p.name.split(' ').join('-')}_${p.id}&`
    }).join('')
  },
  handleCopy(e){
    e.preventDefault()
    this.setState({ copied: true })
  },
  render(){
    var statsSelector = this.props.stats.map((stat) => {
      var color;
      if (stat === 'OBP') {
        color = 'bubbleActive'
      } else {
        color = ''
      }
      return <tr key={stat}><td><button className={'d3BubbleButtons ' + color} id={stat}>{stat}</button></td></tr>
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
        <div id='bubblePlayerLegend'>
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
          <CopyToClipboard text={this.state.value} onCopy={this.onCopy} >
            <button>Copy Chart URL</button>
          </CopyToClipboard>
          <Link to='/scatter'>
            <button>Scatter Plot</button>
          </Link>
          <Link to='/'>
            <button id='backButton' >Back to player selection</button>
          </Link>
        </div>       
      </div>
    )
  }
})

module.exports = BubbleLegend