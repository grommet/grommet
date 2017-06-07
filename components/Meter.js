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

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _Responsive = require('../utils/Responsive');

var _Responsive2 = _interopRequireDefault(_Responsive);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Bar = require('./meter/Bar');

var _Bar2 = _interopRequireDefault(_Bar);

var _Spiral = require('./meter/Spiral');

var _Spiral2 = _interopRequireDefault(_Spiral);

var _Circle = require('./meter/Circle');

var _Circle2 = _interopRequireDefault(_Circle);

var _Arc = require('./meter/Arc');

var _Arc2 = _interopRequireDefault(_Arc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.METER;

var TYPE_COMPONENT = {
  'bar': _Bar2.default,
  'circle': _Circle2.default,
  'arc': _Arc2.default,
  'spiral': _Spiral2.default
};

function getMaxDecimalDigits(series) {
  var maxDigits = 0;
  series.forEach(function (item) {
    var currentDigitsGroup = /\.(\d*)$/.exec(item.value.toString());
    if (currentDigitsGroup) {
      var currentDigits = currentDigitsGroup[1].length;
      maxDigits = Math.max(maxDigits, currentDigits);
    }
  });
  return Math.pow(10, maxDigits);
}

var Meter = function (_Component) {
  _inherits(Meter, _Component);

  function Meter(props, context) {
    _classCallCheck(this, Meter);

    var _this = _possibleConstructorReturn(this, (Meter.__proto__ || Object.getPrototypeOf(Meter)).call(this, props, context));

    _this._onResponsive = _this._onResponsive.bind(_this);
    _this._initialTimeout = _this._initialTimeout.bind(_this);
    _this._onActivate = _this._onActivate.bind(_this);

    _this.state = _this._stateFromProps(props);
    _this.state.initial = true;
    _this.state.limitMeterSize = false;
    return _this;
  }

  _createClass(Meter, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.responsive) {
        this._responsive = _Responsive2.default.start(this._onResponsive);
      }

      this._initialTimer = setTimeout(this._initialTimeout, 10);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var state = this._stateFromProps(nextProps);
      this.setState(_extends({}, state));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this._initialTimer);

      if (this._responsive) {
        this._responsive.stop();
      }
    }
  }, {
    key: '_normalizeSeries',
    value: function _normalizeSeries(props, thresholds) {
      var series = [];
      if (props.series) {
        series = props.series;
      } else if (props.value || props.value === 0) {
        series = [{ value: props.value }];
        if (props.colorIndex) {
          series[0].colorIndex = props.colorIndex;
        }
      }

      // set color index
      if (series.length === 1 && props.thresholds) {
        var item = series[0];
        if (!item.colorIndex) {
          // see which threshold color index to use
          var cumulative = 0;
          thresholds.some(function (threshold) {
            cumulative += threshold.value;
            if (item.value < cumulative) {
              item.colorIndex = threshold.colorIndex || 'graph-1';
              return true;
            }
            return false;
          });
        }
      } else {
        series.forEach(function (item, index) {
          if (!item.colorIndex) {
            item.colorIndex = 'graph-' + (index + 1);
          }
        });
      }

      return series;
    }
  }, {
    key: '_normalizeThresholds',
    value: function _normalizeThresholds(props, min, max) {
      var thresholds = [];
      if (props.thresholds) {
        // Convert thresholds from absolute values to cummulative,
        // so we can re-use the series drawing code.
        var priorValue = min;
        thresholds.push({ hidden: true });
        for (var i = 0; i < props.thresholds.length; i += 1) {
          var threshold = props.thresholds[i];
          // The value for the prior threshold ends at the beginning of this
          // threshold. Series drawing code expects the end value.
          thresholds[i].value = threshold.value - priorValue;
          thresholds.push({
            colorIndex: threshold.colorIndex
          });
          priorValue = threshold.value;
          if (i === props.thresholds.length - 1) {
            thresholds[thresholds.length - 1].value = max - priorValue;
          }
        }
      } else if (props.threshold) {
        thresholds = [{ value: props.threshold, hidden: true }, {
          value: max - props.threshold,
          colorIndex: 'critical'
        }];
      }
      return thresholds;
    }
  }, {
    key: '_seriesTotal',
    value: function _seriesTotal(series) {
      var maxDecimalDigits = getMaxDecimalDigits(series);
      var total = 0;
      series.forEach(function (item) {
        total += item.value * maxDecimalDigits;
      });

      return total / maxDecimalDigits;
    }
  }, {
    key: '_seriesMax',
    value: function _seriesMax(series) {
      var max = 0;
      series.some(function (item) {
        max = Math.max(max, item.value);
      });
      return max;
    }

    // Generates state based on the provided props.

  }, {
    key: '_stateFromProps',
    value: function _stateFromProps(props) {
      var total = void 0;
      if (props.series) {
        total = this._seriesTotal(props.series);
      } else if (props.hasOwnProperty('value')) {
        total = props.value;
      } else {
        total = 0;
      }
      var seriesMax = void 0;
      // only care about series max when there are multiple values
      if (props.series && props.series.length > 1) {
        seriesMax = this._seriesMax(props.series);
      }
      // Normalize min and max
      var min = props.min || 0;
      // Max could be provided in props or come from the total of
      // a multi-value series.
      var max = props.max || (props.stacked ? Math.max(seriesMax, total || 0, 100) : seriesMax || Math.max(total || 0, 100));
      // Normalize simple threshold prop to an array, if needed.
      var thresholds = this._normalizeThresholds(props, min, max);
      // Normalize simple value prop to a series, if needed.
      var series = this._normalizeSeries(props, thresholds);

      var nextState = {
        series: series,
        thresholds: thresholds,
        min: min,
        max: max,
        total: total
      };

      if (props.hasOwnProperty('activeIndex')) {
        nextState.activeIndex = props.activeIndex;
      } else if (props.hasOwnProperty('active')) {
        nextState.activeIndex = props.active ? 0 : undefined;
      }

      return nextState;
    }
  }, {
    key: '_initialTimeout',
    value: function _initialTimeout() {
      this.setState({
        initial: false,
        activeIndex: this.state.activeIndex
      });
      clearTimeout(this._initialTimer);
    }
  }, {
    key: '_onResponsive',
    value: function _onResponsive(small) {
      this.setState({ limitMeterSize: small ? true : false });
    }
  }, {
    key: '_onActivate',
    value: function _onActivate(index) {
      var onActive = this.props.onActive;

      this.setState({ initial: false, activeIndex: index });
      if (onActive) {
        onActive(index);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames,
          _this2 = this;

      var _props = this.props,
          active = _props.active,
          a11yTitle = _props.a11yTitle,
          className = _props.className,
          label = _props.label,
          onActive = _props.onActive,
          size = _props.size,
          stacked = _props.stacked,
          tabIndex = _props.tabIndex,
          type = _props.type,
          vertical = _props.vertical,
          props = _objectWithoutProperties(_props, ['active', 'a11yTitle', 'className', 'label', 'onActive', 'size', 'stacked', 'tabIndex', 'type', 'vertical']);

      delete props.activeIndex;
      delete props.colorIndex;
      delete props.max;
      delete props.min;
      delete props.series;
      delete props.threshold;
      delete props.thresholds;
      delete props.value;
      delete props.responsive;
      var _state = this.state,
          activeIndex = _state.activeIndex,
          limitMeterSize = _state.limitMeterSize,
          max = _state.max,
          min = _state.min,
          series = _state.series,
          thresholds = _state.thresholds,
          total = _state.total;


      var responsiveSize = void 0;
      if (size) {
        responsiveSize = size;
        // shrink Meter to medium size if large and up
        if (limitMeterSize && (size === 'large' || size === 'xlarge')) {
          responsiveSize = 'medium';
        }
      }

      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + type, type), _defineProperty(_classnames, CLASS_ROOT + '--stacked', stacked), _defineProperty(_classnames, CLASS_ROOT + '--vertical', vertical), _defineProperty(_classnames, CLASS_ROOT + '--loading', series.length === 0), _defineProperty(_classnames, CLASS_ROOT + '--single', series.length === 1), _defineProperty(_classnames, CLASS_ROOT + '--count-' + series.length, series.length > 1), _defineProperty(_classnames, CLASS_ROOT + '--' + responsiveSize, responsiveSize), _defineProperty(_classnames, CLASS_ROOT + '--active', active), _classnames), className);

      var labelElement = void 0;
      if (label) {
        labelElement = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__label' },
          label
        );
      }

      var onActivate = void 0;
      if (onActive || series.length > 1 || series.length === 1 && series[0].onClick) {
        onActivate = this._onActivate;
      }

      var GraphicComponent = TYPE_COMPONENT[this.props.type];
      var graphic = _react2.default.createElement(GraphicComponent, {
        a11yTitle: a11yTitle,
        activeIndex: activeIndex,
        min: min, max: max,
        onActivate: onActivate,
        series: series,
        stacked: stacked,
        tabIndex: tabIndex,
        thresholds: thresholds,
        total: total,
        vertical: vertical });

      var graphicContainer = _react2.default.createElement(
        'div',
        _extends({}, props, { className: CLASS_ROOT + '__graphic-container' }),
        graphic
      );

      return _react2.default.createElement(
        'div',
        { className: classes },
        _react2.default.createElement(
          'div',
          { ref: function ref(_ref) {
              return _this2.activeGraphicRef = _ref;
            },
            className: CLASS_ROOT + '__value-container' },
          graphicContainer,
          labelElement
        )
      );
    }
  }]);

  return Meter;
}(_react.Component);

Meter.displayName = 'Meter';
exports.default = Meter;


Meter.propTypes = {
  active: _propTypes2.default.bool, // when single value
  activeIndex: _propTypes2.default.number, // for series values
  a11yTitle: _propTypes2.default.string,
  colorIndex: _propTypes2.default.string,
  label: _propTypes2.default.node,
  max: _propTypes2.default.number,
  min: _propTypes2.default.number,
  onActive: _propTypes2.default.func,
  series: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    colorIndex: _propTypes2.default.string,
    onClick: _propTypes2.default.func,
    label: _propTypes2.default.string, // only for Spiral
    value: _propTypes2.default.number.isRequired
  })),
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
  stacked: _propTypes2.default.bool,
  tabIndex: _propTypes2.default.string,
  threshold: _propTypes2.default.number,
  thresholds: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    value: _propTypes2.default.number.isRequired,
    colorIndex: _propTypes2.default.string
  })),
  type: _propTypes2.default.oneOf(['bar', 'arc', 'circle', 'spiral']),
  value: _propTypes2.default.number,
  vertical: _propTypes2.default.bool,
  responsive: _propTypes2.default.bool
};

Meter.defaultProps = {
  type: 'bar'
};

Meter.contextTypes = {
  intl: _propTypes2.default.object
};
module.exports = exports['default'];