const React = require('react')
const $ = require('jquery')

const Parser = React.createClass({
  getInitialState(){
    return {
      player: '',
      baseball: '',
      headers: ''
    }
  },
  // findCoach(){
  //   var team = document.getElementById('inp')
  //   team = $(team).val()
  //   var that = this
  //   $.ajax({
  //     url: '/api/parser',
  //     type: 'post',
  //     data: { team: team }
  //   }).done((coach) => {
  //     that.setState({ team: team + "'s coach is ", coach: coach.substring(6)})
  //   })
  // },
  baseball(){
    var player = document.getElementById('playerInput')
    player = $(player).val()
    this.setState({ player, baseball: '' })
    var that = this
    $.ajax({
      url:'/api/baseball',
      type: 'post',
      data: { player: player}
    }).done((b) => {
      console.log('in b', b)
      var headers = Object.keys(b[0]).map((k) => {
        return k
      })
      that.setState({ baseball: b, headers: headers })
    })
  },
  render(){
    var content;
    var rows;
    var headers;
    if (this.state.headers) {
      headers = <tr>{this.state.headers.map((h, i) => <td key={i}>{h}</td>)}</tr>
    }
    if (this.state.baseball != '') {
      var rows = []


      this.state.baseball.map((obj) => {


      rows.push(Object.keys(obj).map((k, i) => {

          return <td key={i}>{obj[k]}</td>
      }))

    })

    content = rows.map((r, i) => {
      return <tr key={i}>{r}</tr>
    })

    }
    return (
      <div>
        <h1>in parse</h1>

        <input id='playerInput' type='text' />
        <input onClick={()=> this.baseball()} type='submit' />
        <h1>{this.state.player}</h1>
        <table><tbody>{headers}{content}</tbody></table>
      </div>
    )
  }
})

module.exports = Parser