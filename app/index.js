const React = require('react')
const ReactDOM = require('react-dom')
const { Router, hashHistory, Route} = require('react-router')
const ScatterContainer = require('./containers/ScatterContainer')
require('../public/styles.css')
require('../public/scatter.css')

const Routes = React.createClass({
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={ScatterContainer} />
      </Router>
    )
  }
})

ReactDOM.render(<Routes />, document.getElementById('app'))