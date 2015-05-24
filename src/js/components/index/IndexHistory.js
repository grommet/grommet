// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Reflux = require('reflux');
var Chart = require('../Chart');
var IndexActions = require('../../actions/IndexActions');
var IntlMixin = require('../../mixins/GrommetIntlMixin');

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
    })),
    threshold: React.PropTypes.number,
    type: React.PropTypes.oneOf(['bar', 'area', 'line'])
  },

  mixins: [Reflux.ListenerMixin, IntlMixin],

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
        var label = this.getGrommetIntlMessage(count.value);
        return {label: label, values: values, colorIndex: colorIndex};
      }, this);
      this.setState({series: series, xAxis: xAxis});
    }
  },

  getInitialState: function () {
    return {
      params: this.props.params,
      series: (this.props.series || [])
    };
  },

  componentDidMount: function () {
    if (! this.props.series) {
      this.listenTo(IndexActions.getAggregate.completed, this._onGetAggregateCompleted);
      IndexActions.getAggregate(this.state.params);
    }
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({params: newProps.params});
    if (! newProps.series) {
      IndexActions.getAggregate(newProps.params);
    }
  },

  render: function () {
    return (
      <Chart series={this.state.series || []}
        xAxis={this.state.xAxis || []}
        legend={true}
        type={this.props.type}
        threshold={this.props.threshold} />
    );
  }

});

module.exports = IndexHistory;
