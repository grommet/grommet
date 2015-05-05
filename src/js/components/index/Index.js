// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var IndexTable = require('./IndexTable');
var IndexTiles = require('./IndexTiles');
var IndexHeader = require('./IndexHeader');
var IndexQuery = require('../../utils/IndexQuery');

var CLASS_ROOT = 'index';

var Index = React.createClass({

  propTypes: {
    options: React.PropTypes.shape({
      category: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.arrayOf(React.PropTypes.string)
      ]),
      attributes: React.PropTypes.arrayOf(React.PropTypes.shape({
        attribute: React.PropTypes.string,
        label: React.PropTypes.string,
        index: React.PropTypes.number,
        timestamp: React.PropTypes.bool
      })),
      view: React.PropTypes.oneOf(["table", "tiles"]),
      params: React.PropTypes.shape({
        query: React.PropTypes.string
      })
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
    onMore: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    onQuery: React.PropTypes.func
  },

  getDefaultProps: function () {
    return ({
      options: {
        attributes: [{name: 'name', label: 'Name', index: 0}],
        view: "tiles"
      },
      result: {}
    });
  },

  _onSearch: function (text) {
    var query = IndexQuery.create(text);
    this.props.onQuery(query.fullText);
  },

  render: function () {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var options = this.props.options;

    var searchText = options.params.query || '';

    var result = this.props.result;

    var view = null;
    if ('table' === options.view) {
      view = (
        <IndexTable options={options} result={result}
          onSelect={this.props.onSelect}
          onMore={this.props.onMore} />
      );
    } else if ('tiles' === options.view) {
      view = (
        <IndexTiles options={options} result={result}
          onSelect={this.props.onSelect}
          onMore={this.props.onMore} />
      );
    }

    var error = null;
    if (result.error) {
      error = (
        <div className={CLASS_ROOT + "__error"}>
          {result.error}
        </div>
      );
    }

    return (
      <div className={classes.join(' ')}>
        <div className={CLASS_ROOT + "__container"}>
          <IndexHeader className={CLASS_ROOT + "__header"}
            searchText={searchText}
            total={result.total}
            fixed={'tiles' === options.view || true}
            unfilteredTotal={result.unfilteredTotal}
            onSearch={this._onSearch} />
          {error}
          <div ref="items" className={CLASS_ROOT + "__items"}>
            {view}
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Index;
