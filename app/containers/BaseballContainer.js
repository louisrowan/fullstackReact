const React = require('react')
const $ = require('jquery')

const BaseballContainer = React.createClass({
  getInitialState(){
    return {
      player: '',
      parsedData: [],
      mlbOnly: false,
      headers: [],
      found: ''
    }
  },
  baseball(){
    var playerInput = document.getElementById('playerInput')
    var player = $(playerInput).val()
    $(playerInput).val('')
    this.setState({ player, parsedData: [], found: '' })
    var that = this
    $.ajax({
      url:'/api/baseball',
      type: 'post',
      data: { player: player}
    }).done((data) => {
      console.log(data)
      if (data.length === 0) {
        that.setState({ parsedData: [], headers: [], found: false})
        return
      }
      var headers = Object.keys(data[0]).map((k) => {
        return k
      })
      that.setState({ parsedData: data, headers: headers, found: true })
    })
  },
  dataFilter(){
    if (this.state.mlbOnly) {
      return this.state.parsedData.filter((d) => {
        return d.Level === 'MLB'
      })
    } else {
      return this.state.parsedData
    }
  },
  handleDataFilter() {
    this.setState({ mlbOnly: !this.state.mlbOnly })
  },
  render(){
    var content;
    var rows;
    var headers;
    if (this.state.headers) {
      headers = <tr>{this.state.headers.map((h, i) => <td key={i}>{h}</td>)}</tr>
    }
    if (this.state.shownData != '') {
      var rows = []
      this.dataFilter().map((obj) => {
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
        <h1>Baseball Cube Parsing</h1>

        <form onSubmit={()=> this.baseball()} >
          <input id='playerInput' type='text' />
          <input type='submit' />
        </form>
        <h1>{this.state.player}</h1>
        <button onClick={() => this.handleDataFilter()}>Toggle MLB Data Only</button>

        <table><tbody>{headers}{content}</tbody></table>
        {notFound}
      </div>
    )
  }
})

module.exports = BaseballContainer