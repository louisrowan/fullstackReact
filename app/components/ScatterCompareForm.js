const React = require('react')
const $ = require('jquery')

const ScatterCompareForm = React.createClass({
  getInitialState(){
    return {
      players: [],
      data: [],
      newPlayer: ''
    }
  },
  handleInputChange(e){
    this.setState({ newPlayer: e.target.value})
  },
  handleSubmit(){
    var that = this
    $.ajax({
      url: '/api/baseball',
      type: 'post',
      data: { player: that.state.newPlayer}
    }).done((data) => {
      if (data.length === 0) {
        that.setState({ newPlayer: ''})
      } else {
        data.name = that.state.newPlayer
        console.log(data)
        data = data.filter((d) => {
          return d.Level === 'MLB'
        })
        console.log(data)
        let newData = [...that.state.data, data]
        let players = [...that.state.players, that.state.newPlayer]
  
        that.setState({ data: newData, players, newPlayer: '' })
      }
    })
  },

  render(){
    var playerList;
    if (this.state.players.length > 0){
      playerList = this.state.players.map((p, i) => <li key={i}>{p}</li>)
    }
    return (
      <div>
        <form onSubmit={() => this.handleSubmit()}>
        <input id='inputNew'
          value={this.state.newPlayer}
          onChange={(e)=>this.handleInputChange(e)} />
        <input type='submit' value='Add player' />
        </form>
        <ul>
          {playerList}
        </ul>
        <button onClick={()=> this.props.handleShowChart(this.state.data, this.state.players)}>Show chart</button>
      </div>
    )
  }
})

module.exports = ScatterCompareForm