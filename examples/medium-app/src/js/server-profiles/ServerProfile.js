// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var MediumResource = require('../MediumResource');

var VIEWS = [
  {label: 'Overview', name: 'overview', route: 'server profile overview'},
  {label: 'Map', name: 'map', route: 'server profile map'},
  {label: 'Activity', name: 'activity', route: 'server profile activity'},
  {label: 'Edit', name: 'edit', route: 'server profile edit'},
  {label: 'Delete', name: 'delete', route: 'server profile delete'}
];

var ServerProfile = React.createClass({
  render: function () {
    return (
      <MediumResource categoryRoute="server profiles" views={VIEWS} />
    );
  }
});

module.exports = ServerProfile;
