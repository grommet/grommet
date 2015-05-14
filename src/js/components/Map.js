// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');

var CLASS_ROOT = "map";

function buildItems(items) {
  return items.map(function (item, index) {
    return (
      <li key={index} className={CLASS_ROOT + "__item"}>
        {item}
      </li>
    );
  });
}

function buildCategories(categories) {
  var result = categories.map(function (category) {
    return (
      <li key={category.id} className={CLASS_ROOT + "__category"}>
        <ul className={CLASS_ROOT + "__category-items"}>
          {buildItems(category.items)}
        </ul>
        <div className={CLASS_ROOT + "__category-label"}>
          {category.label}
        </div>
      </li>
    );
  });
  return result;
}

var ResourceMap = React.createClass({

  propTypes: {
    data: React.PropTypes.shape({
      categories: React.PropTypes.arrayOf(React.PropTypes.shape({
        id: React.PropTypes.string,
        label: React.PropTypes.node,
        items: React.PropTypes.arrayOf(React.PropTypes.node)
      })),
      links: React.PropTypes.arrayOf(React.PropTypes.object)
    }).isRequired
  },

  render: function() {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var categories = [];
    if (this.props.data.categories) {
      categories = buildCategories(this.props.data.categories);
    }

    return (
      <div className={classes.join(' ')}>
        <ol className={CLASS_ROOT + "__categories"}>
          {categories}
        </ol>
      </div>
    );
  }

});

module.exports = ResourceMap;
