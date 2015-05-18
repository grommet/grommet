// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var TourIndex = require('./TourIndex');

var OPTIONS = {
  label: "Enclosures",
  view: 'tiles',
  attributes: [
    {attribute: 'status', label: 'Status', index: 0, size: 'small',
      filter: ['Error', 'Warning', 'OK', 'Unknown']},
    {attribute: 'name', label: 'Name', index: 1}
  ],
  params: {
    category: 'enclosures',
    start: 0,
    count: 40
  }
};

var Enclosures = React.createClass({

  propTypes: {
    onMain: React.PropTypes.func
  },

  render: function () {
    return (
      <TourIndex
        resourceRoute="enclosure"
        selectionRoute="enclosure-overview"
        options={OPTIONS}
        onMain={this.props.onMain} />
    );
  }
});

module.exports = Enclosures;
