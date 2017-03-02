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
    if (e) e.preventDefault()

    var handleError = function(){
      return new Promise(function(resolve, reject){
        resolve(this.handleSubmissionErrors())
      }.bind(this))
    }.bind(this)

    handleError()
      .then(function(){
        this.getPlayerData()
      }.bind(this))

  },
  getPlayerData(name){
    var player = name || this.state.newPlayer
    $.ajax({
      url: '/api/baseball',
      type: 'post',
      data: { player: player.toLowerCase()}
    }).done((data) => {
      if (data.length === 0) {
        this.setState({ error: this.state.newPlayer, newPlayer: ''})
      } else {
        data = data.filter((d) => d.Level === 'MLB' )
        data = [...this.state.data, data]
        let players = [...this.state.players, player]
  
        this.setState({ data, players, newPlayer: '', error: false, chartReady: true })
      }
    })
  },
  handleSubmissionErrors(){
    this.setState({ chartReady: false })
    if (this.state.players.indexOf(this.state.newPlayer) >= 0){
      this.setState({ newPlayer: ''})
      return
    }
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
    e.preventDefault()
    this.setState({ newPlayer: name }, function(){
      this.handleSubmit()
    }.bind(this))
  },
  handleInputChange(e){
    this.setState({ newPlayer: e.target.value})
  },
  componentWillMount(){
    if (Object.keys(this.props.location.query).length > 0) {
      this.handleParams(this.props.location.query)
    }
  },
  handleParams(params){
    [params.p1, params.p2, params.p3].forEach((p) => {
      if (p) this.getPlayerData(p.split('-').join(' '))
    })
  },
  render(){
    return (
      <div id='d3LayoutDiv'>
        {React.cloneElement(this.props.children, { players: this.state.players, data: this.state.data, handleSubmit: this.handleSubmit, chartReady: this.state.chartReady, newPlayer: this.state.newPlayer, error: this.state.error, handleInputChange: this.handleInputChange, handlePredictiveClick: this.handlePredictiveClick, handleRemovePlayer: this.handleRemovePlayer, handleSubmit: this.handleSubmit })}
      </div>
    )
  }
})

module.exports = ScatterContainer