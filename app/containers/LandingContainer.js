const React = require('react')
const LandingBackground = require('../components/LandingBackground')
const LandingFooter = require('../components/LandingFooter')
const MainHeader = require('../components/MainHeader')
const ScatterCompareForm = require('../components/ScatterCompareForm')

const LandingContainer = React.createClass({
  render(){
    return (
      <div id='landingContainer'>
        <MainHeader />
        <ScatterCompareForm
          players={this.props.players}
          handleRemovePlayer={this.props.handleRemovePlayer}
          newPlayer={this.props.newPlayer}
          handlePredictiveClick={this.props.handlePredictiveClick}
          error={this.props.error}
          searching={this.props.searching}
          multipleResults={this.props.multipleResults}
          handleMultipleClick={this.props.handleMultipleClick}
          handleSubmit={this.props.handleSubmit}
          handleInputChange={this.props.handleInputChange}
          chartReady={this.props.chartReady}
          data={this.props.data} />
        <LandingBackground />
        <LandingFooter />
      </div>
    )
  }
})

module.exports = LandingContainer