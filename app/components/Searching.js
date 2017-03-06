const React = require('react')

const Searching = React.createClass({
  getInitialState(){
    return {
      text: '',
      content: '...',
      index: 0,
      interval: ''
    }
  },
  componentDidMount(){   
    var interval = setInterval(() => {
      let { index, content } = this.state
      let newIndex;
      if (index >= content.length) {
        newIndex = 0
      } else {
        newIndex = index + 1
      }
      this.setState({ text: content.slice(0, newIndex), index: newIndex})
    }, 200)
    this.setState({ interval })
  },
  componentWillUnmount(){
    clearInterval(this.state.interval)
  },
  render(){
    var { text } = this.state
    return (
      <p>Searching{text}</p>
    )
  }
})

module.exports = Searching