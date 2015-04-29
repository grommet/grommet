// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var IndexTable = require('./index/IndexTable');
var IndexTiles = require('./index/IndexTiles');
var IndexHeader = require('./index/IndexHeader');
var IndexQuery = require('../utils/IndexQuery');

var CLASS_ROOT = 'index';

var Index = React.createClass({

  propTypes: {
    schema: React.PropTypes.arrayOf(React.PropTypes.shape({
      attribute: React.PropTypes.string,
      label: React.PropTypes.string,
      index: React.PropTypes.number,
      timestamp: React.PropTypes.bool
    })),
    data: React.PropTypes.shape({
      total: React.PropTypes.number,
      unFilteredTotal: React.PropTypes.number,
      start: React.PropTypes.number,
      count: React.PropTypes.number,
      items: React.PropTypes.arrayOf(React.PropTypes.object)
    }),
    selection: React.PropTypes.oneOfType([
      React.PropTypes.string, // uri
      React.PropTypes.arrayOf(React.PropTypes.string)
    ]),
    query: React.PropTypes.object,
    error: React.PropTypes.string,
    onSelect: React.PropTypes.func,
    onQuery: React.PropTypes.func,
    onSchema: React.PropTypes.func,
    view: React.PropTypes.oneOf(["table", "tiles"])
  },

  getDefaultProps: function () {
    return ({
      schema: [{name: 'name', label: 'Name', index: 0}],
      view: "table",
      data: {},
      query: IndexQuery.create('')
    });
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

    var data = this.props.data;

    var more = null;
    if (data && (data.start + data.count) < data.total) {
      more = (
        <div ref="more" className={CLASS_ROOT + "__more"}>
          {'more ...'}
        </div>
      );
    }

    var view = null;
    if ('table' === this.props.view) {
      view = <IndexTable schema={this.props.schema} data={data} />;
    } else if ('tiles' === this.props.view) {
      view = <IndexTiles schema={this.props.schema} data={data} />;
    }

    var error = null;
    if (this.props.error) {
      error = (
        <div className={CLASS_ROOT + "__error"}>
          {this.props.error}
        </div>
      );
    }

    return (
      <div className={classes.join(' ')}>
        <div className={CLASS_ROOT + "__container"}>
          <IndexHeader className={CLASS_ROOT + "__header"}
            data={this.props.data}
            query={this.props.query}
            onQuery={this.props.onQuery} />
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
