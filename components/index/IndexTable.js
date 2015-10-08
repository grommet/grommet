// (C) Copyright 2014-2015 Hewlett-Packard Development Company, L.P.

'use strict';

var React = require('react');
var Table = require('../Table');
var IndexAttribute = require('./IndexAttribute');
var StatusIcon = require('../icons/Status');
var IntlMixin = require('../../mixins/GrommetIntlMixin');

var CLASS_ROOT = 'index-table';

var IndexTable = React.createClass({
  displayName: 'IndexTable',

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
    selection: React.PropTypes.oneOfType([React.PropTypes.string, // uri
    React.PropTypes.arrayOf(React.PropTypes.string)]),
    onMore: React.PropTypes.func,
    onSelect: React.PropTypes.func
  },

  mixins: [IntlMixin],

  getInitialState: function getInitialState() {
    return { attributes: this._simplifyAttributes(this.props.options.attributes) };
  },

  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    this.setState({ attributes: this._simplifyAttributes(newProps.options.attributes) });
  },

  _onClickRow: function _onClickRow(uri) {
    this.props.onSelect(uri);
  },

  _simplifyAttributes: function _simplifyAttributes(attributes) {
    return attributes.filter(function (attribute) {
      return attribute.hasOwnProperty('index');
    }).sort(function (a, b) {
      return a.index - b.index;
    });
  },

  render: function render() {
    var classes = [CLASS_ROOT];
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var attributes = this.state.attributes;

    var headerCells = attributes.map(function (attribute) {
      var classes = [];
      if (attribute.secondary) {
        classes.push(CLASS_ROOT + "__header--secondary");
      }
      if (attribute.size) {
        classes.push(CLASS_ROOT + "__header--" + attribute.size);
      }

      var content = this.getGrommetIntlMessage(attribute.label);
      if ('status' === attribute.attribute) {
        classes.push(CLASS_ROOT + "__cell--icon");
        content = React.createElement(StatusIcon, { className: CLASS_ROOT + "__header-icon", value: 'label', small: true });
      } else {
        content = this.getGrommetIntlMessage(content);
      }

      return React.createElement(
        'th',
        { key: attribute.attribute, className: classes.join(' ') },
        content
      );
    }, this);

    var rows = null;
    var selectionIndex = null;
    if (this.props.result.items) {
      rows = this.props.result.items.map(function (item, index) {
        if (this.props.selection && item.uri === this.props.selection) {
          selectionIndex = index;
        }
        var cells = attributes.map(function (attribute) {
          return React.createElement(
            'td',
            { key: attribute.attribute },
            React.createElement(IndexAttribute, { item: item, attribute: attribute })
          );
        }, this);
        return React.createElement(
          'tr',
          { key: item.uri, onClick: this._onClickRow.bind(this, item.uri) },
          cells
        );
      }, this);
    }

    var onMore = null;
    if (this.props.result && this.props.result.count < this.props.result.total) {
      onMore = this.props.onMore;
    }

    return React.createElement(
      Table,
      { className: classes.join(' '),
        selectable: true,
        scrollable: true,
        selection: selectionIndex,
        onMore: onMore },
      React.createElement(
        'thead',
        null,
        React.createElement(
          'tr',
          null,
          headerCells
        )
      ),
      React.createElement(
        'tbody',
        null,
        rows
      )
    );
  }

});

module.exports = IndexTable;