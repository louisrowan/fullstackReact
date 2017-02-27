const React = require('react')
const $ = require('jquery')

const ScatterCompareForm = React.createClass({
  getInitialState(){
    return {
      players: [],
      data: [],
      databaseResults: [],
      newPlayer: '',
      error: false,
      chartReady: false
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
    this.setState({ chartReady: false })
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
      playerList = this.state.players.map((p, i) => <tr key={i}><td className='tableIcon minus' onClick={() => this.handleRemovePlayer(p)}>&#8259;</td><td>{p}</td></tr>)
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
      }).map((name, i) => <tr key={name}><td onClick={() => this.handlePredictiveClick(name)} className='tableIcon plus'>&#x2b;</td><td>{name}</td></tr>)
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
            <h3>Currently on your list...</h3>
            <table>
              <tbody>
                {playerList}
              </tbody>
            </table>
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
            <h3>Are you looking for...</h3>
            <table>
              <tbody>
                {predictiveText}
              </tbody>
            </table>
          </div>
        </div>
          <div id='showChartButton'>
            <input type='submit' onClick={()=> this.props.handleShowChart(this.state.data, this.state.players)} disabled={!this.state.chartReady} value='Show Chart' />
          </div>
      </div>
    )
  }
})

module.exports = ScatterCompareForm