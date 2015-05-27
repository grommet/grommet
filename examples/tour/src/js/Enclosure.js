// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var TourResource = require('./TourResource');

var VIEWS = [
  {label: 'Overview', name: 'overview', route: 'enclosure overview'},
  {label: 'Map', name: 'map', route: 'enclosure map'}
];

var Enclosure = React.createClass({
  render: function () {
    return (
      <TourResource categoryRoute="enclosures" views={VIEWS} />
    );
  }
});

module.exports = Enclosure;
