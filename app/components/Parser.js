const React = require('react')
const $ = require('jquery')

const Parser = React.createClass({
  getInitialState(){
    return {
      player: '',
      baseball: '',
      headers: '',
      found: ''
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
    var playerInput = document.getElementById('playerInput')
    var player = $(playerInput).val()
    $(playerInput).val('')
    this.setState({ player, baseball: '', found: '' })
    var that = this
    $.ajax({
      url:'/api/baseball',
      type: 'post',
      data: { player: player}
    }).done((b) => {
      console.log(b)
      if (b.length === 0) {
        console.log('length zero')
        that.setState({ baseball: '', headers: '', found: false})
        return
      }
      var headers = Object.keys(b[0]).map((k) => {
        return k
      })
      that.setState({ baseball: b, headers: headers, found: true })
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

    var notFound;
    if (this.state.found === false) {
      notFound = this.state.player + ' was not found, try again'
    } else {
      notFound = ''
    }
    return (
      <div>
        <h1>in parse</h1>

        <input id='playerInput' type='text' />
        <input onClick={()=> this.baseball()} type='submit' />
        <h1>{this.state.player}</h1>

        <table><tbody>{headers}{content}</tbody></table>
        {notFound}
      </div>
    )
  }
})

module.exports = Parser