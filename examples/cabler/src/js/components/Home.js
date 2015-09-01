// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Split = require('grommet/components/Split');
var Section = require('grommet/components/Section');
var Configuration = require('./Configuration');

var Home = React.createClass({

  propTypes: {
    data: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {};
  },

  _onResponsive: function (responsive) {
    this.setState({responsive: responsive});
  },

  render: function() {
    var image;
    if ('multiple' === this.state.responsive) {
      image = (
        <Section full={true} pad="none"
          texture="url(img/3PAR_ManPullingDriveSquattingHR.jpg)" />
      );
    }

    return (
      <Split flex="left" separator={true} onResponsive={this._onResponsive}>
        {image}
        <Configuration data={this.props.data} />
      </Split>
    );
  }

});

module.exports = Home;
