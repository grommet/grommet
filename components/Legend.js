'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _FormattedMessage = require('./FormattedMessage');

var _FormattedMessage2 = _interopRequireDefault(_FormattedMessage);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Announcer = require('../utils/Announcer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.LEGEND;
var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;

var Legend = function (_Component) {
  (0, _inherits3.default)(Legend, _Component);

  function Legend(props, context) {
    (0, _classCallCheck3.default)(this, Legend);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Legend).call(this, props, context));

    _this._onActive = _this._onActive.bind(_this);

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
      if (this.props.announce) {
        (0, _Announcer.announce)(this.refs.legend.textContent);
      }
    }
  }, {
    key: '_onActive',
    value: function _onActive(index) {
      this.setState({ activeIndex: index });
      if (this.props.onActive) {
        this.props.onActive(index);
      }
    }
  }, {
    key: '_itemColorIndex',
    value: function _itemColorIndex(item, index) {
      return item.colorIndex || 'graph-' + (index + 1);
    }
  }, {
    key: 'render',
    value: function render() {
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
        if (item.onClick) {
          legendClasses.push(CLASS_ROOT + "__item--clickable");
        }
        var colorIndex = this._itemColorIndex(item, index);
        if (typeof item.value === 'number') {
          totalValue += item.value;
        }

        var valueClasses = [CLASS_ROOT + "__item-value"];
        if (1 === this.props.series.length) {
          valueClasses.push("large-number-font");
        }

        var swatch;
        if (item.hasOwnProperty('colorIndex')) {
          swatch = _react2.default.createElement(
            'svg',
            {
              className: CLASS_ROOT + '__item-swatch ' + (COLOR_INDEX + '-' + colorIndex),
              viewBox: '0 0 12 12' },
            _react2.default.createElement('path', { className: item.className, d: 'M 5 0 l 0 12' })
          );
        }

        var label;
        if (item.hasOwnProperty('label')) {
          if (swatch) {
            label = _react2.default.createElement(
              'span',
              { className: CLASS_ROOT + "__item-label" },
              swatch,
              item.label
            );
          } else {
            label = _react2.default.createElement(
              'span',
              { className: CLASS_ROOT + "__item-label" },
              item.label
            );
          }
        }

        var value;
        if (item.hasOwnProperty('value')) {
          var unitsValue = item.units || this.props.units;
          var unitsPrefix;
          var unitsSuffix;
          if (unitsValue) {
            if (unitsValue.prefix) {
              unitsPrefix = _react2.default.createElement(
                'span',
                { className: CLASS_ROOT + "__item-units" },
                unitsValue.prefix
              );
            }
            if (unitsValue.suffix || typeof unitsValue === 'string' || unitsValue instanceof String) {
              unitsSuffix = _react2.default.createElement(
                'span',
                { className: CLASS_ROOT + "__item-units" },
                unitsValue.suffix || unitsValue
              );
            }
          }
          value = _react2.default.createElement(
            'span',
            { className: valueClasses.join(' ') },
            unitsPrefix,
            item.value,
            unitsSuffix
          );
        }

        return _react2.default.createElement(
          'li',
          { onClick: item.onClick,
            key: item.label || index, className: legendClasses.join(' '),
            onMouseOver: this._onActive.bind(this, index),
            onMouseOut: this._onActive.bind(this, undefined) },
          label,
          value
        );
      }, this);

      // build legend from bottom to top, to align with Meter bar stacking
      items.reverse();

      var total;
      if (this.props.total && this.props.series.length > 1) {
        if (true !== this.props.total) {
          totalValue = this.props.total;
        }
        var unitsPrefix;
        var unitsSuffix;

        if (this.props.units && this.props.units.prefix) {
          unitsPrefix = _react2.default.createElement(
            'span',
            { className: CLASS_ROOT + "__total-units" },
            this.props.units.prefix
          );
        }
        if (this.props.units && (this.props.units.suffix || typeof this.props.units === 'string' || this.props.units instanceof String)) {
          unitsSuffix = _react2.default.createElement(
            'span',
            { className: CLASS_ROOT + "__total-units" },
            this.props.units.suffix || this.props.units
          );
        }

        total = _react2.default.createElement(
          'li',
          { className: CLASS_ROOT + "__total" },
          _react2.default.createElement(
            'span',
            { className: CLASS_ROOT + "__total-label" },
            _react2.default.createElement(_FormattedMessage2.default, { id: 'Total', defaultMessage: 'Total' })
          ),
          _react2.default.createElement(
            'span',
            { className: CLASS_ROOT + "__total-value" },
            unitsPrefix,
            totalValue,
            unitsSuffix
          )
        );
      }

      return _react2.default.createElement(
        'ol',
        { ref: 'legend', className: classes.join(' '), role: 'presentation' },
        items.reverse(),
        total
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
  })]),
  value: _react.PropTypes.number
};
module.exports = exports['default'];