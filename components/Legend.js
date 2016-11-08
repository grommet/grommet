'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _FormattedMessage = require('./FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Announcer = require('../utils/Announcer');

var _Announcer2 = _interopRequireDefault(_Announcer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.LEGEND; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;

var Legend = function (_Component) {
  (0, _inherits3.default)(Legend, _Component);

  function Legend(props, context) {
    (0, _classCallCheck3.default)(this, Legend);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Legend.__proto__ || (0, _getPrototypeOf2.default)(Legend)).call(this, props, context));

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

  (0, _createClass3.default)(Legend, [{
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
          item.label
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

      var total = 0;
      series.forEach(function (item) {
        return total += typeof item.value === 'number' ? item.value : 0;
      });
      return total;
    }
  }, {
    key: '_renderSeries',
    value: function _renderSeries() {
      var _this2 = this;

      var series = this.props.series;
      var activeIndex = this.state.activeIndex;


      return series.map(function (item, index) {
        var _classnames;

        var legendClasses = (0, _classnames3.default)(CLASS_ROOT + '__item', (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__item--active', index === activeIndex), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '__item--clickable', item.onClick), _classnames));

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
          'li',
          { onClick: item.onClick,
            key: item.label || index, className: legendClasses,
            onMouseOver: _this2._onActive.bind(_this2, index),
            onMouseOut: _this2._onActive.bind(_this2, undefined) },
          label,
          value
        );
      }, this);
    }
  }, {
    key: '_renderTotal',
    value: function _renderTotal() {
      var _props = this.props,
          total = _props.total,
          units = _props.units;

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
        'li',
        { className: CLASS_ROOT + '__total' },
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

      var _props2 = this.props,
          className = _props2.className,
          series = _props2.series,
          total = _props2.total,
          props = (0, _objectWithoutProperties3.default)(_props2, ['className', 'series', 'total']);

      delete props.activeIndex;
      delete props.announce;
      delete props.onActive;
      delete props.units;

      var classes = (0, _classnames3.default)(CLASS_ROOT, className);

      var items = this._renderSeries();

      // build legend from bottom to top, to align with Meter bar stacking
      items.reverse();

      var totalNode = void 0;
      if (total && series.length > 1) {
        totalNode = this._renderTotal();
      }

      return _react2.default.createElement(
        'ol',
        (0, _extends3.default)({ ref: function ref(_ref) {
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
  activeIndex: _react.PropTypes.number,
  announce: _react.PropTypes.bool,
  onActive: _react.PropTypes.func,
  series: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.string,
    value: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.node]),
    units: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.shape({
      prefix: _react.PropTypes.string,
      suffix: _react.PropTypes.string
    })]),
    colorIndex: _react.PropTypes.oneOfType([_react.PropTypes.number, // 1-6
    _react.PropTypes.string // status
    ]),
    onClick: _react.PropTypes.func
  })).isRequired,
  total: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.node]),
  units: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.shape({
    prefix: _react.PropTypes.string,
    suffix: _react.PropTypes.string
  })])
};
module.exports = exports['default'];