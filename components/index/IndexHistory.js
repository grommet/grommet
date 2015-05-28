// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Reflux = require('reflux');
var Chart = require('../Chart');
var IndexActions = require('../../actions/IndexActions');
var IntlMixin = require('../../mixins/GrommetIntlMixin');

var STATUS_IMPORTANCE = {
  'Error': 1,
  'Critical': 1,
  'Warning': 2,
  'OK': 3,
  'Disabled': 4,
  'Unknown': 5
};

var IndexHistory = React.createClass({

  propTypes: {
    large: React.PropTypes.bool,
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
    small: React.PropTypes.bool,
    smooth: React.PropTypes.bool,
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
            xAxis.push({
              label: (date.getMonth() + 1) + '/' + date.getDate(),
              value: date
            });
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
      if ('status' === this.state.params.attribute) {
        // re-order by importance
        series.sort(function (s1, s2) {
          return (STATUS_IMPORTANCE[s2.label] - STATUS_IMPORTANCE[s1.label]);
        });
        // mark most severe as most important
        series[series.length-1].important = true;
      }
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
      IndexActions.getAggregate(this.state.params, true);
    }
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({params: newProps.params});
    if (! newProps.series) {
      IndexActions.getAggregate(newProps.params, true);
    }
  },

  render: function () {
    return (
      <Chart series={this.state.series || []}
        xAxis={this.state.xAxis || []}
        legend={true}
        legendTotal={true}
        small={this.props.small}
        large={this.props.large}
        smooth={this.props.smooth}
        type={this.props.type}
        threshold={this.props.threshold} />
    );
  }

});

module.exports = IndexHistory;
