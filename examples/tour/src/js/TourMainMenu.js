// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var React = require('react');
var Menu = require('grommet/components/Menu');
var Link = require('react-router').Link;

var PAGES = [
  {route: 'dashboard', label: 'Dashboard'},
  {route: 'activity', label: 'Activity'},
  {route: 'enclosures', label: 'Enclosures',
    indexCategory: 'enclosures', resourceRoute: 'enclosure'},
  {route: 'servers', label: 'Servers',
    indexCategory: 'server-hardware', resourceRoute: 'server'},
  {route: 'tbd', label: 'Reports'},
  {route: 'settings', label: 'Settings'}
];

var TourMainMenu = React.createClass({

  render: function() {
    var pages = PAGES.map(function (page) {
      return (
        <Link key={page.label} to={page.route} onClick={this.props.onClose}>
          {page.label}
        </Link>
      );
    }, this);

    return (
      <Menu primary={true}>
        {pages}
      </Menu>
    );
  }

});

module.exports = TourMainMenu;
