// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Reflux = require('reflux');
var Donut = require('../Donut');
var IndexActions = require('../../actions/IndexActions');
var IndexQuery = require('../../utils/IndexQuery');

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
    onClick: React.PropTypes.func,
    series: React.PropTypes.arrayOf(React.PropTypes.shape({
      label: React.PropTypes.string,
      value: React.PropTypes.number
    })),
  },

  mixins: [Reflux.ListenerMixin],

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

  _onGetAggregateCompleted: function (response, params) {
    response = response[0];
    if (params === this.state.params) {
      var series = response.counts.map(function(count, index) {
        var colorIndex = 'graph-' + (index + 1);
        if ('status' === this.state.params.attribute) {
          colorIndex = count.value.toLowerCase();
        }
        return {
          label: count.value,
          value: count.count,
          colorIndex: colorIndex,
          onClick: this._onClick.bind(this, count.value)
        };
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

  componentDidMount: function () {
    if (! this.props.series) {
      this.listenTo(IndexActions.getAggregate.completed, this._onGetAggregateCompleted);
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
