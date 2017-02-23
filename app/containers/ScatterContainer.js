const React = require('react')
const D3ScatterCompare = require('../components/D3ScatterCompare')

const ScatterContainer = React.createClass({
  getInitialState(){
    return {
      players: []
    }
  },
  addPlayer(){

  },
  render(){
    return (
      <div>
        In scatter container
        <D3ScatterCompare />
      </div>
    )
  }
})

module.exports = ScatterContainer