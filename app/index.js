const React = require('react')
const ReactDOM = require('react-dom')
const { Router, hashHistory, Route, IndexRoute } = require('react-router')
const Layout = require('./containers/Layout')
const LandingContainer = require('./containers/LandingContainer')
const D3ScatterCompare = require('./components/D3ScatterCompare')
const BubbleContainer = require('./containers/BubbleContainer')
require('../public/styles.css')
require('../public/scatter.css')
require('../public/bubble.css')
require('../public/landing.css')

const Routes = React.createClass({
  render() {
    return (
      <Router history={hashHistory}>
        <Route path='/' component={Layout} >
          <IndexRoute component={LandingContainer} />
          <Route path='scatter' component={D3ScatterCompare} />
          <Route path='bubble' component={BubbleContainer} />
        </Route>
      </Router>
    )
  }
})

ReactDOM.render(<Routes />, document.getElementById('app'))