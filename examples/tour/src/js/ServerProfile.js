// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var TourResource = require('./TourResource');

var VIEWS = [
  {label: 'Overview', name: 'overview', route: 'server profile overview'},
  {label: 'Map', name: 'map', route: 'server profile map'}
];

var ServerProfile = React.createClass({
  render: function () {
    return (
      <TourResource categoryRoute="server profiles" views={VIEWS} />
    );
  }
});

module.exports = ServerProfile;
