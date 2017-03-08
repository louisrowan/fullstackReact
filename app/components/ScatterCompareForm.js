const React = require('react')
const LandingBackground = require('./LandingBackground')
const LandingFooter = require('./LandingFooter')
const MainHeader = require('./MainHeader')
const Searching = require('./Searching')
const Util = require('../../util/Util')
const $ = require('jquery')
const { Link } = require('react-router')
const ReactCSSTransitionGroup = require('react-addons-css-transition-group')


const ScatterCompareForm = React.createClass({
  getInitialState(){
    return {
      databaseResults: []
    }
  },
  componentDidMount(){  
    $.ajax({
      url: '/api/baseball',
    }).done((data) => {
      var databaseResults = data.filter((d) => d.name !== null).map((d) => d.name)
      this.setState({ databaseResults })
    }).fail((fail) => {
      console.log('fail', fail)
    })
  },
  render(){
    var playerList;
    if (this.props.players.length > 0){
      playerList = this.props.players.map((p) => <tr key={p}><td className='tableIcon minus' onClick={() => this.props.handleRemovePlayer(p)}>&#8259;</td><td>{Util.capitalize(p)}</td></tr>)
    }
    var formDisabled;
    var max
    if (this.props.players.length >= 3) {
      formDisabled = true
      max = 'Max players reached'
    } else {
      formDisabled = false
      max = ''
    }

    var predictiveText;
    if (this.state.databaseResults.length > 0 && this.props.newPlayer.length > 0) {
      var count = 0
      predictiveText = this.state.databaseResults.filter((name) => {
        for (let z = 0; z < this.props.newPlayer.length; z++) {
          if (name[z] != this.props.newPlayer[z].toLowerCase() || count >= 5) return
        }
        count += 1
        return name
      }).map((name, i) => <tr key={name}><td onClick={(e) => this.props.handlePredictiveClick(e, name)} className='tableIcon plus'>&#x2b;</td><td>{Util.capitalize(name)}</td></tr>)
    }
    if (this.props.newPlayer.length > 0 && predictiveText.length === 0) {
      predictiveText = <tr><td id='noResultsTd'>No local matches, a search for '{this.props.newPlayer}' will be sent to theBaseBallCube</td></tr>
    }



    var error;
    if (this.props.error){
      error = <p>No results found for {this.props.error}</p>
    } else {
      error = ''
    }

    var searching;
    if (this.props.searching){
      searching = <Searching />
    } else {
      searching = ''
    }


    var multipleResults;
    if (this.props.multipleResults){
      var players = this.props.multipleResults.map((result) => {
        return (
          <tr key={result.born} onClick={() => this.props.handleMultipleClick(result)}>
            <td>Born <b>{result.born}</b>, played <b>{result.data.length}</b> seasons as a <b>{result.position}</b></td>
            </tr>
          )
      })
      multipleResults = <div id='multipleResultsDiv'><table><tbody><tr><td>{this.props.multipleResults.length} players named {Util.capitalize(this.props.multipleResults[0].name)} found, did you mean...</td></tr>{players}</tbody></table></div>
    } else {
      multipleResults = ''
    }

    return (
      <div id='landingContainer'>
        <MainHeader />
        <div id='formContainer'>
          <div id='formH3Div'>
            <h3>Compare up to ANY 3 MLB players, past or present</h3>
          </div>
          <div>
            <h3>Currently on your list...</h3>
            <table>
              <tbody>
                <ReactCSSTransitionGroup
                transitionName='playerListTrans'
                transitionEnter={500}
                transitionLeave={300}>
                {playerList}
                </ReactCSSTransitionGroup>
              </tbody>
            </table>
          </div>
          <div>
            <form onSubmit={(e) => this.props.handleSubmit(e)}>
              <input type='hidden' value='something' />
              <span id='mainInputSpan'>
              <input disabled={formDisabled} id='inputNew'
              value={this.props.newPlayer}
              required
              autoComplete='off'
              onChange={(e)=>this.props.handleInputChange(e)} />
              <span id='mainInputPlaceholder'>Add a Player</span>
              </span>
            
              
              <input className='inputPlus'
                disabled={formDisabled}
                type='submit'
                value='&#x2b;'  />
            

            </form>
            {max}
            {error}
            {searching}
            {multipleResults}
            <br />
            <Link to='/scatter'>
            <input type='submit' 
              className='showChartButton'
              disabled={!this.props.chartReady || this.props.players.length < 1}
            value='Scatter Plot' />
            </Link>
            <br />
            <Link to='/bubble'>
            <input type='submit'
              className='showChartButton'
              disabled={!this.props.chartReady || this.props.players.length < 1}
            value='Bubble Chart' />
            </Link>
          </div>
          <div>
            <h3>Recent Similar Searches...</h3>
            <table>
              <tbody>
                {predictiveText}
              </tbody>
            </table>
          </div>
        </div>
        <LandingBackground />
        <LandingFooter />
      </div>
    )
  }
})

module.exports = ScatterCompareForm