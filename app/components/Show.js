const React = require('react')
const $ = require('jquery')

const Show = React.createClass({
  getInitialState(){
    return {
      item: ''
    }
  },
  componentDidMount(){
    $.ajax({
      url: '/' + this.props.params.id,
      type: 'get'
    }).done(function(res){
      this.setState({ item: res.name })
    }.bind(this))
  },
  render(){
    return (
      <div><h1>in show</h1>
      <a href='/'>home</a>
      <p>{this.state.item}</p></div>
    )
  }
})

module.exports = Show