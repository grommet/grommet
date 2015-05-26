// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var TourIndex = require('../TourIndex');

var OPTIONS = {
  label: "Server Profiles",
  view: 'table',
  attributes: [
    {attribute: 'status', label: 'Status', index: 0, size: 'small',
      filter: ['Error', 'Warning', 'OK', 'Unknown']},
    {attribute: 'name', label: 'Name', index: 1}
  ],
  params: {
    category: 'server-profiles',
    start: 0,
    count: 20,
  }
};

var ServerProfiles = React.createClass({

  propTypes: {
    onMain: React.PropTypes.func
  },

  render: function () {
    return (
      <TourIndex
        manageData={true}
        resourceRoute="server profile"
        selectionRoute="server profile overview"
        addRoute="server profile add"
        options={OPTIONS}
        onMain={this.props.onMain} />
    );
  }
});

module.exports = ServerProfiles;
