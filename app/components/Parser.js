const React = require('react')
const $ = require('jquery')

const Parser = React.createClass({
  getInitialState(){
    return {
      team: '',
      coach: ''
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
      that.setState({ team: team. + "'s coach is ", coach: coach.substring(6)})
    })
  },
  render(){
    return (
      <div>
        <h1>in parse</h1>
        <input id='inp' type='text' />
        <input onClick={() => this.findCoach()} type='submit' />
        <p>
        {this.state.team}{this.state.coach}
        </p>
      </div>
    )
  }
})

module.exports = Parser