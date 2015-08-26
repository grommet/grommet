// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Reflux = require('reflux');
var Meter = require('../Meter');
var Distribution = require('../Distribution');
var IndexActions = require('../../actions/IndexActions');
var IndexQuery = require('../../utils/IndexQuery');
var IntlMixin = require('../../mixins/GrommetIntlMixin');

var STATUS_IMPORTANCE = {
  'Error': 1,
  'Critical': 1,
  'Warning': 2,
  'OK': 3,
  'Disabled': 4,
  'Unknown': 5
};

var IndexAggregate = React.createClass({

  propTypes: {
    large: React.PropTypes.bool, // DEPRECATED: remove in 0.5, use size
    legend: React.PropTypes.oneOfType([
      React.PropTypes.bool,
      React.PropTypes.shape({
        total: React.PropTypes.bool,
        placement: React.PropTypes.oneOf(['right', 'bottom'])
      })
    ]),
    params: React.PropTypes.shape({
      category: React.PropTypes.string,
      query: React.PropTypes.object,
      attribute: React.PropTypes.string
    }),
    onClick: React.PropTypes.func,
    series: React.PropTypes.arrayOf(React.PropTypes.shape({
      label: React.PropTypes.string,
      value: React.PropTypes.number
    })),
    size: React.PropTypes.oneOf(['small', 'medium', 'large']),
    small: React.PropTypes.bool, // DEPRECATED: remove in 0.5, use size
    threshold: React.PropTypes.number,
    type: React.PropTypes.oneOf(['bar', 'arc', 'circle', 'distribution'])
  },

  mixins: [Reflux.ListenerMixin, IntlMixin],

  _onClick: function (value) {
    var query;
    if (this.state.params.query) {
      query = this.state.params.query.clone();
    } else {
      query = IndexQuery.create();
    }
    query.replaceAttributeValues(this.state.params.attribute, [value]);
    this.props.onClick(query);
  },

  _onGetAggregateCompleted: function (response, params, request) {
    response = response[0];
    if (params === this.state.params) {
      var series = response.counts.map(function(count, index) {
        var colorIndex = 'graph-' + (index + 1);
        if ('status' === this.state.params.attribute) {
          colorIndex = count.value.toLowerCase();
        }
        var label = this.getGrommetIntlMessage(count.value);
        return {
          label: label,
          value: count.count,
          colorIndex: colorIndex,
          onClick: this._onClick.bind(this, count.value)
        };
      }, this);
      if ('status' === this.state.params.attribute) {
        // re-order by importance
        series.sort(function (s1, s2) {
          return (STATUS_IMPORTANCE[s2.label] - STATUS_IMPORTANCE[s1.label]);
        });
        // mark most severe as most important
        series[series.length - 1].important = true;
      }
      this.setState({series: series, request: request});
    }
  },

  _normalizeSize: function (props) {
    return props.size || (props.small ? 'small' : (props.large ? 'large' : null));
  },

  getInitialState: function () {
    return {
      params: this.props.params,
      series: (this.props.series || []),
      size: this._normalizeSize(this.props)
    };
  },

  componentDidMount: function () {
    if (! this.props.series) {
      this.listenTo(IndexActions.getAggregate.completed,
        this._onGetAggregateCompleted);
      IndexActions.getAggregate(this.state.params, true);
    }
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({
      params: newProps.params,
      size: this._normalizeSize(newProps)
    });
    if (! newProps.series) {
      IndexActions.getAggregate(newProps.params, true, this.state.request);
    }
  },

  componentWillUnmount: function () {
    IndexActions.stopWatching(this.state.request);
  },

  render: function () {
    var component;
    if ('distribution' === this.props.type) {
      component = (
        <Distribution series={this.state.series || []}
          legend={true}
          legendTotal={true}
          size={this.state.size} />
      );
    } else {
      component = (
        <Meter series={this.state.series || []}
          legend={this.props.legend}
          size={this.state.size}
          type={this.props.type}
          threshold={this.props.threshold} />
      );
    }

    return component;
  }

});

module.exports = IndexAggregate;
