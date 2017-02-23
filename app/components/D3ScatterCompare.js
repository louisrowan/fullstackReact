const React = require('react')

const D3ScatterCompare = React.createClass({
  componentDidMount(){
    this.renderChart()
  },
  renderChart(){

  },
  componentDidUpdate(){
    console.log(this.props.data)
  },
  render(){
    return (
      <div>In scatter compare</div>
    )
  }
})

module.exports = D3ScatterCompare