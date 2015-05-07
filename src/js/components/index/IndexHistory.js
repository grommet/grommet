// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Chart = require('../Chart');
var IndexActions = require('../../actions/IndexActions');

var IndexHistory = React.createClass({

  propTypes: {
    params: React.PropTypes.shape({
      category: React.PropTypes.string,
      query: React.PropTypes.object,
      attribute: React.PropTypes.string,
      interval: React.PropTypes.string,
      count: React.PropTypes.number
    }),
    series: React.PropTypes.arrayOf(React.PropTypes.shape({
      label: React.PropTypes.string,
      value: React.PropTypes.number
    }))
  },

  _onGetAggregateCompleted: function (response, params) {
    response = response[0];
    if (params === this.state.params) {
      var xAxis = [];
      var series = response.counts.map(function(count, index) {
        var values = count.intervals.map(function (interval) {
          var date = new Date(Date.parse(interval.start));
          if (0 === index) {
            xAxis.push((date.getMonth() + 1) + '/' + date.getDate());
          }
          return [date, interval.count];
        });
        var colorIndex = 'graph-' + index;
        if ('status' === this.state.params.attribute) {
          colorIndex = count.value.toLowerCase();
        }
        return {label: count.value, values: values, colorIndex: colorIndex};
      }, this);
      this.setState({series: series, xAxis: xAxis});
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
      <Chart series={this.state.series || []}
        xAxis={this.state.xAxis || []}
        legend={true}
        type="bar" threshold={10} />
    );
  }

});

module.exports = IndexHistory;
