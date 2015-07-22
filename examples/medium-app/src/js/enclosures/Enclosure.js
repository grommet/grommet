// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var MediumResource = require('../MediumResource');

var VIEWS = [
  {label: 'Overview', name: 'overview', route: 'enclosure overview'},
  {label: 'Map', name: 'map', route: 'enclosure map'},
  {label: 'Activity', name: 'activity', route: 'enclosure activity'}
];

var Enclosure = React.createClass({
  render: function () {
    return (
      <MediumResource categoryRoute="enclosures" views={VIEWS} />
    );
  }
});

module.exports = Enclosure;
