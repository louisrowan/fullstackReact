const React = require('react')
const ReactDOM = require('react-dom')
const { Router, hashHistory, Route} = require('react-router')
const Show = require('./components/Show')
const App = require('./components/App')
const Parser = require('./components/Parser')
require('../public/styles.css')

const Routes = React.createClass({
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={App} />
        <Route path='/parse' component={Parser} />
        <Route path='/:id' component={Show} />
        
      </Router>
    )
  }
})

ReactDOM.render(<Routes />, document.getElementById('app'))