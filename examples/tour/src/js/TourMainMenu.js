// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var React = require('react');
var Menu = require('grommet/components/Menu');
var IntlMixin = require('grommet/mixins/GrommetIntlMixin');
var Link = require('react-router').Link;

var PAGES = [
  {route: 'dashboard', label: 'dashboard'},
  {route: 'activity', label: 'activity'},
  {route: 'enclosures', label: 'enclosures',
    indexCategory: 'enclosures', resourceRoute: 'enclosure'},
  {route: 'server hardwares', label: 'serverHardware',
    indexCategory: 'server-hardware', resourceRoute: 'server hardware'},
  {route: 'server profiles', label: 'serverProfiles',
    indexCategory: 'server-profiles', resourceRoute: 'server profile'},
  {route: 'tbd', label: 'reports'},
  {route: 'settings', label: 'settings'}
];

var TourMainMenu = React.createClass({

  mixins: [IntlMixin],

  render: function() {
    var pages = PAGES.map(function (page) {
      var label = this.getIntlMessage(page.label);
      return (
        <Link key={label} to={page.route}>
          {label}
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
