// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Donut = require('../Donut');
var IndexActions = require('../../actions/IndexActions');

var STATUS_IMPORTANCE = {
  'Error': 1,
  'Critical': 1,
  'Warning': 2,
  'OK': 3,
  'Disabled': 4,
  'Unknown': 5
};

var IndexDonut = React.createClass({

  propTypes: {
    params: React.PropTypes.shape({
      category: React.PropTypes.string,
      query: React.PropTypes.object,
      attribute: React.PropTypes.string
    }),
    series: React.PropTypes.arrayOf(React.PropTypes.shape({
      label: React.PropTypes.string,
      value: React.PropTypes.number
    })),
  },

  _onGetAggregateCompleted: function (response, params) {
    response = response[0];
    if (params === this.state.params) {
      var series = response.counts.map(function(count, index) {
        var colorIndex = 'graph-' + (index + 1);
        if ('status' === this.state.params.attribute) {
          colorIndex = count.value.toLowerCase();
        }
        return {label: count.value, value: count.count, colorIndex: colorIndex};
      }, this);
      if ('status' === this.state.params.attribute) {
        // re-order by importance
        series.sort(function (s1, s2) {
          return (STATUS_IMPORTANCE[s1.label] - STATUS_IMPORTANCE[s2.label]);
        });
      }
      this.setState({series: series});
    }
  },

  getInitialState: function () {
    return {params: this.props.params, series: (this.props.series || [])};
  },

  componentWillMount: function () {
    if (! this.props.series) {
      IndexActions.getAggregate.completed.listen(this._onGetAggregateCompleted);
      IndexActions.getAggregate(this.state.params);
    }
  },

  render: function () {
    return (
      <Donut series={this.state.series || []} legend={true} />
    );
  }

});

module.exports = IndexDonut;
