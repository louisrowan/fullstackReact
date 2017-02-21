const React = require('react')
const $ = require('jquery')

const Parser = React.createClass({
  getInitialState(){
    return {
      team: '',
      coach: '',
      baseball: '',
      headers: ''
    }
  },
  findCoach(){
    var team = document.getElementById('inp')
    team = $(team).val()
    var that = this
    $.ajax({
      url: '/api/parser',
      type: 'post',
      data: { team: team }
    }).done((coach) => {
      that.setState({ team: team + "'s coach is ", coach: coach.substring(6)})
    })
  },
  baseball(){
    var that = this
    $.ajax({
      url:'/api/baseball',
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
      headers = <tr>{this.state.headers.map((h) => <td>{h}</td>)}</tr>
    }
    if (this.state.baseball != '') {
      var rows = []


      this.state.baseball.map((obj) => {


      rows.push(Object.keys(obj).map((k, i) => {

          return <td>{obj[k]}</td>
      }))

    })

    content = rows.map((r) => {
      return <tr>{r}</tr>
    })

    }
    return (
      <div>
        <h1>in parse</h1>
        <input id='inp' type='text' />
        <input onClick={() => this.findCoach()} type='submit' />
        <p>
        {this.state.team}{this.state.coach}
        </p>
        <input onClick={()=> this.baseball()} type='submit' />
        <table><tbody>{headers}{content}</tbody></table>
      </div>
    )
  }
})

module.exports = Parser