const React = require('react')
const ScatterLegend = require('../components/ScatterLegend')
const D3Bubble = require('../components/D3Bubble')

const BubbleContainer = React.createClass({
  render(){
    return (
      <div id=' BubbleContainer'>
        <ScatterLegend
          data={this.props.data}
          players={this.props.players}
          backToForm={this.props.backToForm} />
        <D3Bubble
          data={this.props.data}
          players={this.props.players} />
      </div>
    )
  }
})

module.exports = BubbleContainer