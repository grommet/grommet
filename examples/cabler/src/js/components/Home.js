// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Split = require('grommet/components/Split');
var Section = require('grommet/components/Section');
var Configuration = require('./Configuration');

var Home = React.createClass({

  propTypes: {
    onConfigure: React.PropTypes.func.isRequired
  },

  getInitialState: function () {
    return {data: null};
  },

  render: function() {
    return (
      <Split flex="left" separator={true}>
        <Section full={true} pad="none" texture="url(img/3PAR_ManPullingDriveSquattingHR.jpg)" />
        <Configuration onConfigure={this.props.onConfigure} />
      </Split>
    );
  }

});

module.exports = Home;
