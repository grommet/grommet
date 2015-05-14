// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Split = require('grommet/components/Split');
var TourMain = require('./TourMain');

var TourSplit = React.createClass({

  render: function() {
    return (
      <Split bias="right">
        <TourMain />
        <RouteHandler />
      </Split>
    );
  }

});

module.exports = TourSplit;
