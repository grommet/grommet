// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Tiles = require('../Tiles');
var Tile = require('../Tile');
var Header = require('../Header');
var IndexAttribute = require('./IndexAttribute');

var CLASS_ROOT = 'index-tiles';

var IndexTiles = React.createClass({

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

  render: function () {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var tiles = null;
    if (this.props.data && this.props.data.items) {
      tiles = this.props.data.items.map(function (item) {

        var headerValues = [];
        var values = [];

        this.props.attributes.forEach(function (attribute) {
          var value = (
            <IndexAttribute key={attribute.attribute}
              item={item} attribute={attribute} />
          );
          if ('status' === attribute.attribute ||
            'name' === attribute.attribute) {
            headerValues.push(value);
          } else {
            values.push(value);
          }
        }, this);

        return (
          <Tile key={item.uri}>
            <Header>
              <span>{headerValues}</span>
            </Header>
            {values}
          </Tile>
        );
      }, this);
    }

    return (
      <Tiles className={classes.join(' ')}>
        {tiles}
      </Tiles>
    );
  }

});

module.exports = IndexTiles;
