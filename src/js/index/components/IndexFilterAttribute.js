// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var _ = require('lodash');
var React = require('react');
var String = require('../utils/String');

CLASS_ROOT = 'index-filter-attribute';

var IndexFilterAttribute = React.createClass({

  _onFilterChange: function (attribute, value) {
    var tokenText = attribute.name + ':' + String.quoteIfNecessary(value);
    var search = this.props.search.clone();
    search.toggle(tokenText);
    this.props.onSearch(search.fullText)
  },

  render: function () {
    var attribute = this.props.attribute;
    var aggregate = attribute.unfilteredAggregateResult;

    var values = '';
    if (aggregate) {
      var onFilterChange = this._onFilterChange;
      values = aggregate.counts.map(function (count, index) {
        var id = attribute.name + '-' + index;
        return (
          <li key={id} className={CLASS_ROOT + '__attribute-value list-item'}>
            <label className={'checkbox'} htmlFor={id}>
              <input type="checkbox" id={id} checked={count.filterActive}
                onChange={onFilterChange.bind(null, attribute, count.value)} />
              {count.value}
            </label>
          </li>
        );
      });
    }

    return (
      <div className={CLASS_ROOT}>
        <div className={CLASS_ROOT + "__header"}>
          {attribute.label}
        </div>
        <ol className={CLASS_ROOT + "__values list-block list-block--tiny"}>
          {values}
        </ol>
      </div>
    );
  }

});

module.exports = IndexFilterAttribute;
