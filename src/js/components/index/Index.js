// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var Reflux = require('reflux');
var merge = require('lodash/object/merge');
var IndexActions = require('../../actions/IndexActions');
var IndexStore = require('../../stores/IndexStore');
var IndexTable = require('./IndexTable');
var IndexTiles = require('./IndexTiles');
var IndexList = require('./IndexList');
var IndexHeader = require('./IndexHeader');
var IntlMixin = require('../../mixins/GrommetIntlMixin');

var CLASS_ROOT = 'index';

var Index = React.createClass({

  propTypes: {
    flush: React.PropTypes.bool,
    options: React.PropTypes.shape({
      label: React.PropTypes.string,
      attributes: React.PropTypes.arrayOf(React.PropTypes.shape({
        attribute: React.PropTypes.string,
        header: React.PropTypes.bool,
        index: React.PropTypes.number,
        label: React.PropTypes.string,
        size: React.PropTypes.string,
        timestamp: React.PropTypes.bool
      })),
      view: React.PropTypes.oneOf(["table", "tiles", "list"]),
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
    addControl: React.PropTypes.node,
    navControl: React.PropTypes.node,
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

  mixins: [Reflux.ListenerMixin, IntlMixin],

  getDefaultProps: function () {
    return ({
      options: {
        attributes: [{name: 'name', label: 'Name', index: 0}],
        flush: true,
        view: "tiles"
      }
    });
  },

  getInitialState: function () {
    return {options: this.props.options, result: (this.props.result || {})};
  },

  componentDidMount: function () {
    if (! this.props.result) {
      IndexActions.setup(this.state.options);
      this.listenTo(IndexStore, this._onIndexChange);
    }
  },

  componentWillReceiveProps: function (newProps) {
    this.setState({options: newProps.options});
    if (newProps.result) {
      this.setState({result: newProps.result});
    }
  },

  componentWillUnmount: function () {
    if (! this.props.result) {
      IndexActions.cleanup();
    }
  },

  _onQuery: function (query) {
    if (! this.props.result) {
      var params = merge(this.state.options.params, {query: query});
      IndexActions.getItems(params, true, this.state.request);
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
        {count: (params.count + (this.state.options.pageSize || 20))});
      IndexActions.getItems(params, true, this.state.request);
    }
  },

  _onIndexChange: function (data) {
    this.setState(data);
  },

  render: function () {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var options = this.state.options;
    var result = this.state.result;

    var onMore = this.props.onMore;
    if (! this.props.result && ! onMore) {
      onMore = this._onMore;
    }

    var view = null;
    if ('table' === options.view) {
      view = (
        <IndexTable options={options} result={result}
          flush={this.props.flush}
          selection={this.props.selection}
          onSelect={this.props.onSelect}
          onMore={onMore} />
      );
    } else if ('tiles' === options.view) {
      view = (
        <IndexTiles options={options} result={result}
          flush={this.props.flush}
          selection={this.props.selection}
          onSelect={this.props.onSelect}
          onMore={onMore} />
      );
    } else if ('list' === options.view) {
      view = (
        <IndexList options={options} result={result}
          flush={this.props.flush}
          selection={this.props.selection}
          onSelect={this.props.onSelect}
          onMore={onMore} />
      );
    }

    var error = null;
    if (this.state.error) {
      error = (
        <div className={CLASS_ROOT + "__error"}>
          {this.state.error}
        </div>
      );
    }

    return (
      <div className={classes.join(' ')}>
        <div className={CLASS_ROOT + "__container"}>
          <IndexHeader className={CLASS_ROOT + "__header"}
            options={options}
            total={result.total}
            fixed={true}
            unfilteredTotal={result.unfilteredTotal}
            onQuery={this._onQuery}
            addControl={this.props.addControl}
            navControl={this.props.navControl} />
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
