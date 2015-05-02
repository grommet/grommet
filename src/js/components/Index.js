// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var IndexTable = require('./index/IndexTable');
var IndexTiles = require('./index/IndexTiles');
var IndexHeader = require('./index/IndexHeader');
var IndexQuery = require('../utils/IndexQuery');

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
    onSelect: React.PropTypes.func,
    onQuery: React.PropTypes.func
  },

  getDefaultProps: function () {
    return ({
      options: {
        attributes: [{name: 'name', label: 'Name', index: 0}],
        view: "table"
      },
      result: {}
    });
  },

  _onSearch: function (text) {
    var query = IndexQuery.create(text);
    this.props.onQuery(query.fullText);
  },

  /*
  _onScroll: function () {
    // delay a bit to ride out quick users
    clearTimeout(this._scrollTimer);
    this._scrollTimer = setTimeout(function () {
      // are we at the bottom?
      var resourcesElement = this.refs.resources.getDOMNode();
      var moreElement = this.refs.more.getDOMNode();
      var resourcesRect = resourcesElement.getBoundingClientRect();
      var moreRect = moreElement.getBoundingClientRect();
      if (moreRect.bottom <= resourcesRect.bottom) {
        // do we have more we could show?
        var index = this.props.index;
        if (index.result.count < index.result.total) {
          // get one more page's worth of data
          var params = _.extend({}, index.params);
          params.count += index.pageSize;
          IndexActions.getResult(params);
        }
      }
    }.bind(this), 2000);
  },

  componentDidMount: function () {
    this.refs.resources.getDOMNode().addEventListener("scroll", this._onScroll);
  },

  componentWillReceiveProps: function () {
    if (nextProps.index.result.members.length > 0 &&
      ! nextProps.index.result.members[0]._activity &&
      nextProps.index.includeActivity) {
      // check for activity
      var state = this.state;
      clearTimeout(this._activityTimer);
      this._activityTimer = setTimeout(function () {
        IndexActions.getIndexActivity(state.result.members);
      }, 1000); // delay a bit in case the user is searching
    }
  },

  componentWillUnmount: function () {
    clearTimeout(this._activityTimer);
    clearTimeout(this._scrollTimer);
    this.refs.resources.getDOMNode().removeEventListener("scroll", this._onScroll);
  },
  */

  render: function () {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var options = this.props.options;

    var searchText = options.params.query || '';
    //if (options.params.query) {
    //  searchText = options.params.query.fullText;
    //}

    var result = this.props.result;
    var more = null;
    if ((result.start + result.count) < result.total) {
      more = (
        <div ref="more" className={CLASS_ROOT + "__more"}>
          {'more ...'}
        </div>
      );
    }

    var view = null;
    if ('table' === options.view) {
      view = <IndexTable options={options} result={result} />;
    } else if ('tiles' === options.view) {
      view = <IndexTiles options={options} result={result} />;
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
            unfilteredTotal={result.unfilteredTotal}
            onSearch={this._onSearch} />
          <div ref="items" className={CLASS_ROOT + "__items"}>
            {error}
            {view}
            {more}
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Index;
