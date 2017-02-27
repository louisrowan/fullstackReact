const React = require('react')
const $ = require('jquery')

const ScatterCompareForm = React.createClass({
  getInitialState(){
    return {
      players: [],
      data: [],
      databaseResults: [],
      newPlayer: '',
      error: false
    }
  },
  handlePredictiveClick(name){
    this.setState({ newPlayer: name }, function(){
      this.handleSubmit()
    }.bind(this))
  },
  handleInputChange(e){
    this.setState({ newPlayer: e.target.value})
  },
  handleSubmit(e){
    var that = this
    $.ajax({
      url: '/api/baseball',
      type: 'post',
      data: { player: that.state.newPlayer}
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
  
        that.setState({ data: newData, players, newPlayer: '', error: false })
      }
    })
  },
  componentDidMount(){
      var that = this
      $.ajax({
        url: '/api/baseball',
      }).done((data) => {
        var databaseResults = data.map((d) => d.name)
        that.setState({ databaseResults })
      }).fail((fail) => {
        console.log('fail', fail)
      })
  },
  render(){
    var playerList;
    if (this.state.players.length > 0){
      playerList = this.state.players.map((p, i) => <li key={i}>{p}</li>)
    }
    var formDisabled;
    var max
    if (this.state.players.length >= 3) {
      formDisabled = true
      max = 'Max players reached'
    } else {
      formDisabled = false
      max = ''
    }

    var predictiveText;
    if (this.state.databaseResults.length > 1 && this.state.newPlayer.length > 0) {
      predictiveText = this.state.databaseResults.filter((name) => {
        for (let z = 0; z < this.state.newPlayer.length; z++) {
          if (name[z] != this.state.newPlayer[z]) return
        }
        return name
      }).map((name, i) => <li key={name} onClick={() => this.handlePredictiveClick(name)}>{name}</li>)
    }



    var error;
    if (this.state.error){
      error = <p>No results found for {this.state.error}</p>
    } else {
      error = ''
    }

    return (
      <div>
        <div id='formContainer'>
          <div>
            <ul>
              <li key='header'><h3>Currently on your list...</h3></li>
              {playerList}
            </ul>
          </div>
          <div>
            <form onSubmit={(e) => this.handleSubmit(e)}>
            <input disabled={formDisabled} id='inputNew'
              value={this.state.newPlayer}
              onChange={(e)=>this.handleInputChange(e)} />
              
            <input disabled={formDisabled} type='submit' value='Add player'  />
            

            </form>
            {max}
            {error}
          </div>
          <div>
            <ul><li key='header'><h3>Are you looking for...</h3></li>{predictiveText}</ul>
          </div>
        </div>
          <div id='showChartButton'>
            <button onClick={()=> this.props.handleShowChart(this.state.data, this.state.players)}>Show chart</button>
          </div>
      </div>
    )
  }
})

module.exports = ScatterCompareForm