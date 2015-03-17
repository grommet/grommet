// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var IndexAggregate = require('../components/IndexAggregate');

var CLASS_ROOT = "index-aggregates";

var IndexAggregates = React.createClass({

  render: function() {
    var classes = [CLASS_ROOT, "list-block"];

    var aggregates = [];
    aggregates = this.props.aggregates.map(function (attribute) {
      return (
        <li key={attribute.name} className={CLASS_ROOT + "__aggregate list-item"}>
          <IndexAggregate category={this.props.category}
            attribute={attribute}
            search={this.props.search}
            onSearch={this.props.onSearch} />
        </li>
      );
    }, this);

    return (
      <ol className={classes.join(' ')}>
        {aggregates}
      </ol>
    );
  }

});

module.exports = IndexAggregates;
