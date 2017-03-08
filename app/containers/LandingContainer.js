const React = require('react')
const LandingBackground = require('../components/LandingBackground')
const LandingFooter = require('../components/LandingFooter')
const MainHeader = require('../components/MainHeader')
const ScatterCompareForm = require('../components/ScatterCompareForm')

const LandingContainer = React.createClass({
  render(){
    var { players,
          handleRemovePlayer,
          newPlayer,
          handlePredictiveClick,
          error,
          searching,
          multipleResults,
          handleMultipleClick,
          handleSubmit,
          handleInputChange,
          chartReady,
          data } = this.props
    return (
      <div id='landingContainer'>
        <MainHeader />
        <ScatterCompareForm
          players={players}
          handleRemovePlayer={handleRemovePlayer}
          newPlayer={newPlayer}
          handlePredictiveClick={handlePredictiveClick}
          error={error}
          searching={searching}
          multipleResults={multipleResults}
          handleMultipleClick={handleMultipleClick}
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          chartReady={chartReady}
          data={data} />
        <LandingBackground />
        <LandingFooter />
      </div>
    )
  }
})

module.exports = LandingContainer