// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var TourResource = require('./TourResource');

var VIEWS = [
  {label: 'Overview', name: 'overview', route: 'server-overview'},
  {label: 'Map', name: 'map', route: 'server-map'}
];

var Server = React.createClass({
  render: function () {
    return (
      <TourResource categoryRoute="servers" views={VIEWS} />
    );
  }
});

module.exports = Server;
