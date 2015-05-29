// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var MediumResource = require('./MediumResource');

var VIEWS = [
  {label: 'Overview', name: 'overview', route: 'server hardware overview'},
  {label: 'Map', name: 'map', route: 'server hardware map'}
];

var ServerHardware = React.createClass({
  render: function () {
    return (
      <MediumResource categoryRoute="server hardwares" views={VIEWS} />
    );
  }
});

module.exports = ServerHardware;
