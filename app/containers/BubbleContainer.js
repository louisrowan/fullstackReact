const React = require('react')
const ScatterLegend = require('../components/ScatterLegend')
const D3Bubble = require('../components/D3Bubble')
const BubbleLegend = require('../components/BubbleLegend')

const BubbleContainer = React.createClass({
  getInitialState(){
    return {
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
  render(){
    return (
      <div id='bubbleContainer'>
        <BubbleLegend
          data={this.props.data} 
          players={this.props.players}
          stats={this.state.stats} />
        <D3Bubble
          data={this.props.data}
          players={this.props.players}
          stats={this.state.stats} />
      </div>
    )
  }
})

module.exports = BubbleContainer