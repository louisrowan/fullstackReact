const React = require('react')
const D3ScatterCompare = require('../components/D3ScatterCompare')
const ScatterCompareForm = require('../components/ScatterCompareForm')

const ScatterContainer = React.createClass({
  getInitialState(){
    return {
      players: [],
      data: [],
      showChart: false
    }
  },
  handleShowChart(data, players){
    this.setState({ data, players, showChart: true})
  },
  backToForm(){
    this.setState({ players: [], data: [], showChart: false})
  },
  render(){
    let content;
    if (this.state.showChart){
      content = <D3ScatterCompare players={this.state.players} data={this.state.data} backToForm={this.backToForm} />
    } else {
      content = <ScatterCompareForm handleShowChart={this.handleShowChart} />
    }
    return (
      <div id='d3LayoutDiv'>
        {content}
      </div>
    )
  }
})

module.exports = ScatterContainer