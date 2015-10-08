// (C) Copyright 2014 Hewlett-Packard Development Company, L.P.

'use strict';

var React = require('react');
var IntlMixin = require('../mixins/GrommetIntlMixin');

var CLASS_ROOT = "legend";

var Legend = React.createClass({
  displayName: 'Legend',

  propTypes: {
    activeIndex: React.PropTypes.number,
    onActive: React.PropTypes.func,
    series: React.PropTypes.arrayOf(React.PropTypes.shape({
      label: React.PropTypes.string,
      value: React.PropTypes.number,
      units: React.PropTypes.string,
      colorIndex: React.PropTypes.oneOfType([React.PropTypes.number, // 1-6
      React.PropTypes.string // status
      ]),
      onClick: React.PropTypes.func
    })).isRequired,
    total: React.PropTypes.bool,
    units: React.PropTypes.string,
    value: React.PropTypes.number
  },

  mixins: [IntlMixin],

  getInitialState: function getInitialState() {
    return { activeIndex: this.props.activeIndex };
  },

  componentWillReceiveProps: function componentWillReceiveProps(newProps) {
    this.setState({ activeIndex: newProps.activeIndex });
  },

  _onActive: function _onActive(index) {
    this.setState({ activeIndex: index });
    if (this.props.onActive) {
      this.props.onActive(index);
    }
  },

  _itemColorIndex: function _itemColorIndex(item, index) {
    return item.colorIndex || 'graph-' + (index + 1);
  },

  render: function render() {
    var classes = [CLASS_ROOT];
    if (this.props.series.length === 1) {
      classes.push(CLASS_ROOT + "--single");
    }
    if (this.props.className) {
      classes.push(this.props.className);
    }

    var totalValue = 0;
    var items = this.props.series.map(function (item, index) {
      var legendClasses = [CLASS_ROOT + "__item"];
      if (index === this.state.activeIndex) {
        legendClasses.push(CLASS_ROOT + "__item--active");
      }
      var colorIndex = this._itemColorIndex(item, index);
      totalValue += item.value;

      var valueClasses = [CLASS_ROOT + "__item-value"];
      if (1 === this.props.series.length) {
        valueClasses.push("large-number-font");
      }

      var swatch;
      if (item.hasOwnProperty('colorIndex')) {
        swatch = React.createElement(
          'svg',
          { className: CLASS_ROOT + "__item-swatch color-index-" + colorIndex,
            viewBox: '0 0 12 12' },
          React.createElement('path', { className: item.className, d: 'M 5 0 l 0 12' })
        );
      }

      var label;
      if (item.hasOwnProperty('label')) {
        label = React.createElement(
          'span',
          { className: CLASS_ROOT + "__item-label" },
          item.label
        );
      }

      var value;
      if (item.hasOwnProperty('value')) {
        value = React.createElement(
          'span',
          { className: valueClasses.join(' ') },
          item.value,
          React.createElement(
            'span',
            { className: CLASS_ROOT + "__item-units" },
            this.props.units
          )
        );
      }

      return React.createElement(
        'li',
        { key: item.label || index, className: legendClasses.join(' '),
          onClick: item.onClick,
          onMouseOver: this._onActive.bind(this, index),
          onMouseOut: this._onActive.bind(this, this.props.activeIndex) },
        swatch,
        label,
        value
      );
    }, this);

    var total = null;
    if (this.props.total && this.props.series.length > 1) {
      total = React.createElement(
        'li',
        { className: CLASS_ROOT + "__total" },
        React.createElement(
          'span',
          { className: CLASS_ROOT + "__total-label" },
          this.getGrommetIntlMessage('Total')
        ),
        React.createElement(
          'span',
          { className: CLASS_ROOT + "__total-value" },
          totalValue,
          React.createElement(
            'span',
            { className: CLASS_ROOT + "__total-units" },
            this.props.units
          )
        )
      );
    }

    return React.createElement(
      'ol',
      { className: classes.join(' ') },
      items.reverse(),
      total
    );
  }

});

module.exports = Legend;