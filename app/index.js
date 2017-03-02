const React = require('react')
const ReactDOM = require('react-dom')
const { Router, hashHistory, Route, IndexRoute } = require('react-router')
const ScatterContainer = require('./containers/ScatterContainer')
const ScatterCompareForm = require('./components/ScatterCompareForm')
const D3ScatterCompare = require('./components/D3ScatterCompare')
require('../public/styles.css')
require('../public/scatter.css')

const Routes = React.createClass({
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={ScatterContainer} >
          <IndexRoute component={ScatterCompareForm} />
          <Route path='scatter' component={D3ScatterCompare} />
        </Route>
      </Router>
    )
  }
})

ReactDOM.render(<Routes />, document.getElementById('app'))