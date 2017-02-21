const React = require('react')
const $ = require('jquery')

const Parser = React.createClass({
  componentDidMount(){
    $.ajax({
      url: '/api/parser'
    }).done((f) => {
      console.log('res', f)
    })
  },
  render(){
    return (
      <div>in parse</div>
    )
  }
})

module.exports = Parser