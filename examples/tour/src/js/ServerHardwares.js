// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var TourIndex = require('./TourIndex');

var OPTIONS = {
  label: "Server Hardware",
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
    sort: 'name:asc'
  }
};

var ServerHardwares = React.createClass({

  propTypes: {
    onMain: React.PropTypes.func
  },

  render: function () {
    return (
      <TourIndex
        manageData={true}
        resourceRoute="server hardware"
        selectionRoute="server hardware overview"
        options={OPTIONS}
        onMain={this.props.onMain} />
    );
  }
});

module.exports = ServerHardwares;
