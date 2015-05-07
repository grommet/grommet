// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Reflux = require('reflux');
var merge = require('lodash/object/merge');
var IndexActions = require('../../actions/IndexActions');
var IndexStore = require('../../stores/IndexStore');
var IndexTable = require('./IndexTable');
var IndexTiles = require('./IndexTiles');
var IndexHeader = require('./IndexHeader');

var CLASS_ROOT = 'index';

var Index = React.createClass({

  propTypes: {
    options: React.PropTypes.shape({
      attributes: React.PropTypes.arrayOf(React.PropTypes.shape({
        attribute: React.PropTypes.string,
        header: React.PropTypes.bool,
        index: React.PropTypes.number,
        label: React.PropTypes.string,
        size: React.PropTypes.string,
        timestamp: React.PropTypes.bool
      })),
      view: React.PropTypes.oneOf(["table", "tiles"]),
      params: React.PropTypes.shape({
        category: React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.arrayOf(React.PropTypes.string)
        ]),
        query: React.PropTypes.object
      })
    }),
    selection: React.PropTypes.oneOfType([
      React.PropTypes.string, // uri
      React.PropTypes.arrayOf(React.PropTypes.string)
    ]),
    onSelect: React.PropTypes.func,
    onQuery: React.PropTypes.func,
    // if a result is omitted, the Index will use the expected REST api
    result: React.PropTypes.shape({
      total: React.PropTypes.number,
      unfilteredTotal: React.PropTypes.number,
      start: React.PropTypes.number,
      count: React.PropTypes.number,
      items: React.PropTypes.arrayOf(React.PropTypes.object),
      error: React.PropTypes.string
    }),
    onMore: React.PropTypes.func
  },

  getDefaultProps: function () {
    return ({
      options: {
        attributes: [{name: 'name', label: 'Name', index: 0}],
        view: "tiles"
      }
    });
  },

  mixins: [Reflux.ListenerMixin],

  _onQuery: function (query) {
    if (! this.props.result) {
      var params = merge(this.state.options.params, {query: query});
      IndexActions.getItems(params);
    }
    if (this.props.onQuery) {
      this.props.onQuery(query);
    }
  },

  _onMore: function () {
    // do we have more we could show?
    var result = this.state.result;
    if (result.count < result.total) {
      // get one more page's worth of data
      var params = this.state.options.params;
      params = merge(params,
        {count: (params.count + this.state.options.pageSize)});
      IndexActions.getItems(params);
    }
  },

  _onIndexChange: function (data) {
    console.log('!!! Index _onIndexChange', data);
    this.setState(data);
  },

  getInitialState: function () {
    return {options: this.props.options, result: (this.props.result || {})};
  },

  componentWillMount: function () {
    if (! this.props.result) {
      IndexActions.setup(this.state.options);
    }
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({options: this.props.options});
    if (newProps.result) {
      this.setState({result: newProps.result});
    }
  },

  componentDidMount: function () {
    if (! this.props.result) {
      this.listenTo(IndexStore, this._onIndexChange);
    }
  },

  render: function () {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var options = this.state.options;
    var result = this.state.result;

    var view = null;
    if ('table' === options.view) {
      view = (
        <IndexTable options={options} result={result}
          onSelect={this.props.onSelect}
          onMore={this._onMore} />
      );
    } else if ('tiles' === options.view) {
      view = (
        <IndexTiles options={options} result={result}
          onSelect={this.props.onSelect}
          onMore={this._onMore} />
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
            options={options}
            total={result.total}
            fixed={'tiles' === options.view || true}
            unfilteredTotal={result.unfilteredTotal}
            onQuery={this._onQuery} />
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
