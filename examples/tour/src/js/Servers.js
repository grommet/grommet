// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var TourIndex = require('./TourIndex');

var OPTIONS = {
  label: "Servers",
  view: 'table',
  attributes: [
    {attribute: 'status', label: 'Status', index: 0, size: 'small',
      filter: ['Error', 'Warning', 'OK', 'Unknown']},
    {attribute: 'name', label: 'Name', index: 1},
    {attribute: 'model', label: 'Model', index: 2, secondary: true}
  ],
  params: {
    category: 'server-hardware',
    start: 0,
    count: 20,
  }
};

var Servers = React.createClass({

  propTypes: {
    onMain: React.PropTypes.func
  },

  render: function () {
    return (
      <TourIndex
        manageData={true}
        resourceRoute="server"
        selectionRoute="server-overview"
        addRoute="server add"
        options={OPTIONS}
        onMain={this.props.onMain} />
    );
  }
});

module.exports = Servers;
