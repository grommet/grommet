// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Link = require('react-router').Link;
//var Ligo = require('ligo');
var DashboardIcon = require('./DashboardIcon');

var TourMenu = React.createClass({

  render: function() {
    return (
      <div>
        <Link to="tour"><DashboardIcon />Dashboard</Link>
        <Link to="activity">Activity</Link>
        <Link to="tbd">Resports</Link>
        <Link to="settings">Settings</Link>
      </div>
    );
  }

});

module.exports = TourMenu;
