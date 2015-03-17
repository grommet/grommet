// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var _ = require('lodash');
var React = require('react');
var Search = require('../utils/Search');
var Donut = require('../../components/Donut');

var STATUS_IMPORTANCE = {
  'Critical': 1,
  'Warning': 2,
  'OK': 3,
  'Disabled': 4,
  'Unknown': 5
};

var IndexAggregate = React.createClass({

  _onClickValue: function (value) {
    var search = this.props.search || Search.create('');
    var token = {attribute: this.props.attribute.name, value: value};
    var nameSearch = search.clone();
    nameSearch.add(token);
    this.props.onSearch(nameSearch.fullText, this.props.category);
  },

  render: function() {
    var search = this.props.search || Search.create('');
    var attribute = this.props.attribute;
    var aggregate;
    var series = [];

    var title = this.props.title;

    if (this.props.hasOwnProperty('aggregateResult')) {
      aggregate = this.props.aggregateResult;
    } else if (search.fullText.length > 0) {
      aggregate = attribute.filteredAggregateResult;
    } else {
      aggregate = attribute.unfilteredAggregateResult;
    }

    if (aggregate) {
      aggregate.counts.forEach(function (count, index) {
        var colorId = index + 1;
        if ('status' === attribute.name) {
          colorId = count.value.toLowerCase();
        }
        var className = 'series-' + colorId;

        series.push({
          label: count.value,
          value: count.count,
          className: className,
          onClick: this._onClickValue.bind(this, count.value)
        });
      }, this);
    }

    if ('status' === attribute.name) {
      // re-order by importance
      series.sort(function (s1, s2) {
        return (STATUS_IMPORTANCE[s1.label] - STATUS_IMPORTANCE[s2.label]);
      });
    }

    return (
      <div className={"index-aggregate"}>
        <h3 className={"index-aggregate__header"}>
          {title}
        </h3>
        <div className={"index-aggregate__donut"}>
          <Donut series={series} key={this.props.key} />
        </div>
      </div>
    );
  }

});

module.exports = IndexAggregate;
