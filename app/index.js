const React = require('react')
const ReactDOM = require('react-dom')

const App = React.createClass({
  render(){
    return (
      <div>
        this is my App
      </div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('app'))