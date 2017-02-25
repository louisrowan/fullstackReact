const React = require('react')
const ReactDOM = require('react-dom')
const { Router, hashHistory, Route} = require('react-router')
const Show = require('./components/Show')
const App = require('./components/App')
const BaseballContainer = require('./containers/BaseballContainer')
const ScatterContainer = require('./containers/ScatterContainer')
require('../public/styles.css')
require('../public/scatter.css')

const Routes = React.createClass({
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={App} />
        <Route path='/parse' component={BaseballContainer} />
        <Route path='/d3Scatter' component={ScatterContainer} />
        <Route path='/:id' component={Show} />
        
      </Router>
    )
  }
})

ReactDOM.render(<Routes />, document.getElementById('app'))