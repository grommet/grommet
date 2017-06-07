'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames3 = require('classnames');

var _classnames4 = _interopRequireDefault(_classnames3);

var _FormattedMessage = require('./FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

var _List = require('./List');

var _List2 = _interopRequireDefault(_List);

var _ListItem = require('./ListItem');

var _ListItem2 = _interopRequireDefault(_ListItem);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Announcer = require('../utils/Announcer');

var _Announcer2 = _interopRequireDefault(_Announcer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.LEGEND;
var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;

function getMaxDecimalDigits(series) {
  var maxDigits = 0;
  series.forEach(function (item) {
    var currentDigitsGroup = /\.(\d*)$/.exec(item.value.toString());
    if (currentDigitsGroup) {
      var currentDigits = currentDigitsGroup[1].length;
      maxDigits = Math.max(maxDigits, currentDigits);
    }
  });

  return maxDigits;
}

var Legend = function (_Component) {
  _inherits(Legend, _Component);

  function Legend(props, context) {
    _classCallCheck(this, Legend);

    var _this = _possibleConstructorReturn(this, (Legend.__proto__ || Object.getPrototypeOf(Legend)).call(this, props, context));

    _this._onActive = _this._onActive.bind(_this);
    _this._renderSeries = _this._renderSeries.bind(_this);
    _this._renderSwatch = _this._renderSwatch.bind(_this);
    _this._renderLabel = _this._renderLabel.bind(_this);
    _this._renderValue = _this._renderValue.bind(_this);
    _this._renderTotal = _this._renderTotal.bind(_this);
    _this._seriesTotal = _this._seriesTotal.bind(_this);

    _this.state = { activeIndex: _this.props.activeIndex };
    return _this;
  }

  _createClass(Legend, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      if (newProps.activeIndex !== this.state.activeIndex) {
        this.setState({ activeIndex: newProps.activeIndex });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      var announce = this.props.announce;

      if (announce) {
        _Announcer2.default.announce(this.legendRef.textContent);
      }
    }
  }, {
    key: '_onActive',
    value: function _onActive(index) {
      var onActive = this.props.onActive;

      this.setState({ activeIndex: index });
      if (onActive) {
        onActive(index);
      }
    }
  }, {
    key: '_itemColorIndex',
    value: function _itemColorIndex(item, index) {
      return item.colorIndex || 'graph-' + (index + 1);
    }
  }, {
    key: '_renderSwatch',
    value: function _renderSwatch(item, index) {
      var colorIndex = this._itemColorIndex(item, index);
      return _react2.default.createElement(
        'svg',
        { className: CLASS_ROOT + '__item-swatch ' + COLOR_INDEX + '-' + colorIndex, viewBox: '0 0 12 12' },
        _react2.default.createElement('path', { className: item.className, d: 'M 5 0 l 0 12' })
      );
    }
  }, {
    key: '_renderLabel',
    value: function _renderLabel(item, swatch) {
      if (swatch) {
        return _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + '__item-label' },
          swatch,
          _react2.default.createElement(
            'span',
            null,
            item.label
          )
        );
      } else {
        return _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + '__item-label' },
          item.label
        );
      }
    }
  }, {
    key: '_renderValue',
    value: function _renderValue(item) {
      var units = this.props.units;

      var unitsValue = item.units || units;
      var valueClasses = CLASS_ROOT + '__item-value';
      var unitsPrefix = void 0;
      var unitsSuffix = void 0;
      if (unitsValue) {
        if (unitsValue.prefix) {
          unitsPrefix = _react2.default.createElement(
            'span',
            { className: CLASS_ROOT + '__item-units' },
            unitsValue.prefix
          );
        }
        if (unitsValue.suffix || typeof unitsValue === 'string' || unitsValue instanceof String) {
          unitsSuffix = _react2.default.createElement(
            'span',
            { className: CLASS_ROOT + '__item-units' },
            unitsValue.suffix || unitsValue
          );
        }
      }
      return _react2.default.createElement(
        'span',
        { className: valueClasses },
        unitsPrefix,
        item.value,
        unitsSuffix
      );
    }
  }, {
    key: '_seriesTotal',
    value: function _seriesTotal() {
      var series = this.props.series;

      var maxDecimalDigits = getMaxDecimalDigits(series);
      var total = 0;
      series.forEach(function (item) {
        return total += typeof item.value === 'number' ? item.value : 0;
      });
      return parseFloat(total.toFixed(maxDecimalDigits));
    }
  }, {
    key: '_renderSeries',
    value: function _renderSeries() {
      var _this2 = this;

      var _props = this.props,
          series = _props.series,
          responsive = _props.responsive;
      var activeIndex = this.state.activeIndex;


      return series.map(function (item, index) {
        var _classnames;

        var legendClasses = (0, _classnames4.default)(CLASS_ROOT + '__item', (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '__item--active', index === activeIndex), _defineProperty(_classnames, CLASS_ROOT + '__item--clickable', item.onClick), _classnames));

        var swatch = void 0;
        if (item.hasOwnProperty('colorIndex')) {
          swatch = _this2._renderSwatch(item, index);
        }

        var label = void 0;
        if (item.hasOwnProperty('label')) {
          label = _this2._renderLabel(item, swatch);
        }

        var value = void 0;
        if (item.hasOwnProperty('value')) {
          value = _this2._renderValue(item);
        }

        return _react2.default.createElement(
          _ListItem2.default,
          { onClick: item.onClick, justify: 'between',
            separator: 'none', pad: { horizontal: 'small' },
            key: item.label || index, className: legendClasses,
            onMouseOver: _this2._onActive.bind(_this2, index),
            onMouseOut: _this2._onActive.bind(_this2, undefined),
            responsive: responsive },
          label,
          value
        );
      }, this);
    }
  }, {
    key: '_renderTotal',
    value: function _renderTotal() {
      var _props2 = this.props,
          total = _props2.total,
          units = _props2.units,
          responsive = _props2.responsive;

      var totalValue = void 0;
      if (total !== true) {
        totalValue = total;
      } else {
        totalValue = this._seriesTotal();
      }
      var unitsPrefix = void 0;
      var unitsSuffix = void 0;
      if (units && units.prefix) {
        unitsPrefix = _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + '__total-units' },
          units.prefix
        );
      }
      if (units && (units.suffix || typeof units === 'string' || units instanceof String)) {
        unitsSuffix = _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + '__total-units' },
          units.suffix || units
        );
      }

      return _react2.default.createElement(
        _ListItem2.default,
        { className: CLASS_ROOT + '__total',
          justify: 'between', separator: 'none', pad: { horizontal: 'small' },
          responsive: responsive },
        _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + '__total-label' },
          _react2.default.createElement(_FormattedMessage2.default, { id: 'Total', defaultMessage: 'Total' })
        ),
        _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + '__total-value' },
          unitsPrefix,
          totalValue,
          unitsSuffix
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props3 = this.props,
          className = _props3.className,
          series = _props3.series,
          size = _props3.size,
          total = _props3.total,
          props = _objectWithoutProperties(_props3, ['className', 'series', 'size', 'total']);

      delete props.activeIndex;
      delete props.announce;
      delete props.onActive;
      delete props.units;
      delete props.responsive;

      var classes = (0, _classnames4.default)(CLASS_ROOT, _defineProperty({}, CLASS_ROOT + '--' + size, size), className);

      var items = this._renderSeries();

      // build legend from bottom to top, to align with Meter bar stacking
      items.reverse();

      var totalNode = void 0;
      if (total && series.length > 1) {
        totalNode = this._renderTotal();
      }

      return _react2.default.createElement(
        _List2.default,
        _extends({ ref: function ref(_ref) {
            return _this3.legendRef = _ref;
          } }, props, { className: classes }),
        items.reverse(),
        totalNode
      );
    }
  }]);

  return Legend;
}(_react.Component);

Legend.displayName = 'Legend';
exports.default = Legend;


Legend.defaultProps = {
  announce: false
};

Legend.propTypes = {
  activeIndex: _propTypes2.default.number,
  announce: _propTypes2.default.bool,
  onActive: _propTypes2.default.func,
  series: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    label: _propTypes2.default.string,
    value: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.node]),
    units: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
      prefix: _propTypes2.default.string,
      suffix: _propTypes2.default.string
    })]),
    colorIndex: _propTypes2.default.oneOfType([_propTypes2.default.number, // 1-6
    _propTypes2.default.string // status
    ]),
    onClick: _propTypes2.default.func
  })).isRequired,
  size: _propTypes2.default.oneOf(['medium', 'large']),
  total: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.node]),
  units: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
    prefix: _propTypes2.default.string,
    suffix: _propTypes2.default.string
  })]),
  responsive: _propTypes2.default.bool
};
module.exports = exports['default'];