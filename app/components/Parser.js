const React = require('react')
const $ = require('jquery')

const Parser = React.createClass({
  getInitialState(){
    return {
      team: '',
      coach: '',
      baseball: ''
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
      that.setState({ baseball: b})
    })
  },
  render(){
    var content;
    if (this.state.baseball != '') {


      content = this.state.baseball.map((obj) => {


        return Object.keys(obj).map((k, i) => {
          console.log(k, obj[k])
          return <p>{k}, {obj[k]}</p>
      })

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
        {content}
      </div>
    )
  }
})

module.exports = Parser