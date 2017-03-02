const React = require('react')
const D3ScatterCompare = require('../components/D3ScatterCompare')
const ScatterCompareForm = require('../components/ScatterCompareForm')
const $ = require('jquery')

const ScatterContainer = React.createClass({
  getInitialState(){
    return {
      players: [],
      data: [],
      chartReady: false,
      newPlayer: '',
      error: false
    }
  },
  handleSubmit(e){
    e.preventDefault()
    console.log(e, this.state.newPlayer)
    this.setState({ chartReady: false })
    if (this.state.players.indexOf(this.state.newPlayer) >= 0){
      this.setState({ newPlayer: ''})
      return
    }
    var that = this
    $.ajax({
      url: '/api/baseball',
      type: 'post',
      data: { player: that.state.newPlayer.toLowerCase()}
    }).done((data) => {
      if (data.length === 0) {
        that.setState({ error: that.state.newPlayer, newPlayer: ''})
      } else {
        data.name = that.state.newPlayer
        data = data.filter((d) => {
          return d.Level === 'MLB'
        })
        let newData = [...that.state.data, data]
        let players = [...that.state.players, that.state.newPlayer]
  
        that.setState({ data: newData, players, newPlayer: '', error: false, chartReady: true })
      }
    })
  },
  handleRemovePlayer(name) {
    var index = this.state.players.indexOf(name)
    var players = this.state.players
    var data = this.state.data
    players.splice(index, 1)
    data.splice(index, 1)
    this.setState({ players, data })
  },
  handlePredictiveClick(e, name){
    this.setState({ newPlayer: name }, function(){
      this.handleSubmit(e)
    }.bind(this))
  },
  handleInputChange(e){
    this.setState({ newPlayer: e.target.value})
  },
  render(){
    console.log(this.props.location.query)
    return (
      <div id='d3LayoutDiv'>
        {React.cloneElement(this.props.children, { players: this.state.players, data: this.state.data, handleSubmit: this.handleSubmit, chartReady: this.state.chartReady, newPlayer: this.state.newPlayer, error: this.state.error, handleInputChange: this.handleInputChange, handlePredictiveClick: this.handlePredictiveClick, handleRemovePlayer: this.handleRemovePlayer, handleSubmit: this.handleSubmit })}
      </div>
    )
  }
})

module.exports = ScatterContainer