// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

var React = require('react');
var IndexAttribute = require('./IndexAttribute');
var InfiniteScroll = require('../../mixins/InfiniteScroll');
var SpinningIcon = require('../icons/Spinning');

var CLASS_ROOT = 'index-list';

var IndexList = React.createClass({

  propTypes: {
    flush: React.PropTypes.bool,
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

  mixins: [InfiniteScroll],

  getDefaultProps: function () {
    return {flush: true};
  },

  _onClick: function (uri) {
    this.props.onSelect(uri);
  },

  componentDidMount: function () {
    if (this.props.onMore && this.refs.more) {
      this.startListeningForScroll(this.refs.more.getDOMNode(),
        this.props.onMore);
    }
  },

  componentDidUpdate: function () {
    this.stopListeningForScroll();
    if (this.props.onMore && this.refs.more) {
      this.startListeningForScroll(this.refs.more.getDOMNode(),
        this.props.onMore);
    }
  },

  componentWillUnmount: function () {
    if (this.props.onMore) {
      this.stopListeningForScroll();
    }
  },

  render: function () {
    var classes = [CLASS_ROOT];
    if (this.props.flush) {
      classes.push(CLASS_ROOT + "--flush");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var items = null;
    if (this.props.result && this.props.result.items) {
      items = this.props.result.items.map(function (item) {
        var classes = [CLASS_ROOT + "__item"];
        if (this.props.selection && item.uri === this.props.selection) {
          classes.push(CLASS_ROOT + "__item--selected");
        }

        var headerValues = [];
        var values = [];
        var footerValues = [];

        this.props.options.attributes.forEach(function (attribute) {
          var value = (
            <IndexAttribute key={attribute.attribute}
              item={item} attribute={attribute} />
          );
          if (attribute.header) {
            headerValues.push(value);
          } else if (attribute.footer) {
            footerValues.push(value);
          } else {
            values.push(value);
          }
        }, this);

        var header = null;
        if (headerValues.length > 0) {
          header = (
            <div className={CLASS_ROOT + "__item-header"}>
              {headerValues}
            </div>
          );
        }

        var footer = null;
        if (footerValues.length > 0) {
          footer = (
            <div className={CLASS_ROOT + "__item-footer"}>
              {footerValues}
            </div>
          );
        }

        return (
          <li key={item.uri} className={classes.join(' ')}
            onClick={this._onClick.bind(this, item.uri)}>
            {header}
            {values}
            {footer}
          </li>
        );
      }, this);
    }

    var more = null;
    if (this.props.result &&
      this.props.result.count < this.props.result.total) {
      more = (
        <div ref="more" className={CLASS_ROOT + "__more"}>
          <SpinningIcon />
        </div>
      );
    }

    return (
      <ol className={classes.join(' ')}>
        {items}
        {more}
      </ol>
    );
  }

});

module.exports = IndexList;
