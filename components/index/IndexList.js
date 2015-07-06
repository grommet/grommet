// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var List = require('../List');
var IndexAttribute = require('./IndexAttribute');

var CLASS_ROOT = 'index-list';

var IndexList = React.createClass({

  propTypes: {
    options: React.PropTypes.shape({
      attributes: React.PropTypes.arrayOf(React.PropTypes.shape({
        attribute: React.PropTypes.string,
        label: React.PropTypes.string,
        index: React.PropTypes.number,
        timestamp: React.PropTypes.bool
      }))
    }),
    result: React.PropTypes.shape({
      total: React.PropTypes.number,
      unfilteredTotal: React.PropTypes.number,
      start: React.PropTypes.number,
      count: React.PropTypes.number,
      items: React.PropTypes.arrayOf(React.PropTypes.object),
      error: React.PropTypes.string
    }),
    selection: React.PropTypes.oneOfType([
      React.PropTypes.string, // uri
      React.PropTypes.arrayOf(React.PropTypes.string)
    ]),
    onSelect: React.PropTypes.func
  },

  _onSelect: function (item) {
    this.props.onSelect(item.uri);
  },

  render: function () {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    // build List scheme from attributes
    var schema = [{attribute: 'uri', uid: true}];
    this.props.options.attributes.forEach(function (attribute) {
      if ('status' === attribute.attribute) {
        schema.push({attribute: 'status', image: true});
      } else if (1 === attribute.index) {
        schema.push({attribute: attribute.attribute, primary: true});
      } else if (2 === attribute.index) {
        schema.push({attribute: attribute.attribute, secondary: true});
      }
    });

    var data = [];
    if (this.props.result && this.props.result.items) {
      data = this.props.result.items.map(function (item) {
        var dataItem = {uri: item.uri};

        schema.forEach(function (scheme) {
          if (! scheme.uid) {
            dataItem[scheme.attribute] = (
              <IndexAttribute key={scheme.attribute}
                item={item} attribute={{attribute: scheme.attribute}} />
            );
          }
        }, this);

        return dataItem;
      }, this);
    }

    var onMore = null;
    if (this.props.result &&
      this.props.result.count < this.props.result.total) {
      onMore = this.props.onMore;
    }

    return (
      <List className={classes.join(' ')}
        schema={schema} data={data} selected={this.props.selection}
        onMore={onMore} onSelect={this._onSelect} />
    );
  }

});

module.exports = IndexList;
