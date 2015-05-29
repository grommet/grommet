// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.
var React = require('react');
var Menu = require('grommet/components/Menu');
var IntlMixin = require('grommet/mixins/GrommetIntlMixin');
var Link = require('react-router').Link;

var PAGES = [
  {route: 'dashboard', label: 'Dashboard'},
  {route: 'activity', label: 'Activity'},
  {route: 'enclosures', label: 'Enclosures',
    indexCategory: 'enclosures', resourceRoute: 'enclosure'},
  {route: 'server hardwares', label: 'Server Hardware',
    indexCategory: 'server-hardware', resourceRoute: 'server hardware'},
  {route: 'server profiles', label: 'Server Profiles',
    indexCategory: 'server-profiles', resourceRoute: 'server profile'},
  {route: 'tbd', label: 'Reports'},
  {route: 'settings', label: 'Settings'}
];

var MediumMainMenu = React.createClass({

  mixins: [IntlMixin],

  render: function() {
    var pages = PAGES.map(function (page) {
      var label = this.getGrommetIntlMessage(page.label);
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

module.exports = MediumMainMenu;
