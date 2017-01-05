'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

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
  (0, _inherits3.default)(Meter, _Component);

  function Meter(props, context) {
    (0, _classCallCheck3.default)(this, Meter);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Meter.__proto__ || (0, _getPrototypeOf2.default)(Meter)).call(this, props, context));

    _this._onResponsive = _this._onResponsive.bind(_this);
    _this._initialTimeout = _this._initialTimeout.bind(_this);
    _this._onActivate = _this._onActivate.bind(_this);

    _this.state = _this._stateFromProps(props);
    _this.state.initial = true;
    _this.state.limitMeterSize = false;
    return _this;
  }

  (0, _createClass3.default)(Meter, [{
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
      this.setState((0, _extends3.default)({}, state));
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
        (function () {
          var item = series[0];
          if (!item.colorIndex) {
            (function () {
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
            })();
          }
        })();
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
          props = (0, _objectWithoutProperties3.default)(_props, ['active', 'a11yTitle', 'className', 'label', 'onActive', 'size', 'stacked', 'tabIndex', 'type', 'vertical']);

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

      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + type, type), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--stacked', stacked), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--vertical', vertical), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--loading', series.length === 0), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--single', series.length === 1), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--count-' + series.length, series.length > 1), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + responsiveSize, responsiveSize), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--active', active), _classnames), className);

      var labelElement = void 0;
      if (label) {
        labelElement = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__label' },
          label
        );
      }

      var onActivate = void 0;
      if (onActive || series.length > 1 || series[0].onClick) {
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
        (0, _extends3.default)({}, props, { className: CLASS_ROOT + '__graphic-container' }),
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
  active: _react.PropTypes.bool, // when single value
  activeIndex: _react.PropTypes.number, // for series values
  a11yTitle: _react.PropTypes.string,
  colorIndex: _react.PropTypes.string,
  label: _react.PropTypes.node,
  max: _react.PropTypes.number,
  min: _react.PropTypes.number,
  onActive: _react.PropTypes.func,
  series: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    colorIndex: _react.PropTypes.string,
    onClick: _react.PropTypes.func,
    label: _react.PropTypes.string, // only for Spiral
    value: _react.PropTypes.number.isRequired
  })),
  size: _react.PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
  stacked: _react.PropTypes.bool,
  tabIndex: _react.PropTypes.string,
  threshold: _react.PropTypes.number,
  thresholds: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    value: _react.PropTypes.number.isRequired,
    colorIndex: _react.PropTypes.string
  })),
  type: _react.PropTypes.oneOf(['bar', 'arc', 'circle', 'spiral']),
  value: _react.PropTypes.number,
  vertical: _react.PropTypes.bool,
  responsive: _react.PropTypes.bool
};

Meter.defaultProps = {
  type: 'bar'
};

Meter.contextTypes = {
  intl: _react.PropTypes.object
};
module.exports = exports['default'];