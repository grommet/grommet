'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

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

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Props = require('../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

var _Responsive = require('../utils/Responsive');

var _Responsive2 = _interopRequireDefault(_Responsive);

var _Legend = require('./Legend');

var _Legend2 = _interopRequireDefault(_Legend);

var _Bar = require('./meter/Bar');

var _Bar2 = _interopRequireDefault(_Bar);

var _Spiral = require('./meter/Spiral');

var _Spiral2 = _interopRequireDefault(_Spiral);

var _Circle = require('./meter/Circle');

var _Circle2 = _interopRequireDefault(_Circle);

var _Arc = require('./meter/Arc');

var _Arc2 = _interopRequireDefault(_Arc);

var _Intl = require('../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.METER; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

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
    _this._layout = _this._layout.bind(_this);
    _this._onResize = _this._onResize.bind(_this);
    _this._onActivate = _this._onActivate.bind(_this);

    _this.state = _this._stateFromProps(props);
    if (_this.state.placeLegend) {
      _this.state.legendPlacement = 'bottom';
    }
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
      window.addEventListener('resize', this._onResize);
      this._onResize();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var state = this._stateFromProps(nextProps);
      this.setState(state);
      this._onResize();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this._initialTimer);
      clearTimeout(this._resizeTimer);
      window.removeEventListener('resize', this._onResize);

      if (this._responsive) {
        this._responsive.stop();
      }
    }
  }, {
    key: '_initialTimeout',
    value: function _initialTimeout() {
      this.setState({
        initial: false,
        activeIndex: this.state.importantIndex
      });
      clearTimeout(this._initialTimer);
    }
  }, {
    key: '_onResponsive',
    value: function _onResponsive(small) {
      if (small) {
        this.setState({ limitMeterSize: true });
      } else {
        this.setState({ limitMeterSize: false });
      }
    }
  }, {
    key: '_onActivate',
    value: function _onActivate(index) {
      var onActive = this.props.onActive;
      var importantIndex = this.state.importantIndex;

      if (index === undefined) {
        index = importantIndex;
      }
      this.setState({ initial: false, activeIndex: index });
      if (onActive) {
        onActive(index);
      }
    }
  }, {
    key: '_onResize',
    value: function _onResize() {
      // debounce
      clearTimeout(this._resizeTimer);
      this._resizeTimer = setTimeout(this._layout, 50);
    }
  }, {
    key: '_layout',
    value: function _layout() {
      var _state = this.state;
      var placeLegend = _state.placeLegend;
      var legendPlacement = _state.legendPlacement;

      if (placeLegend) {
        // legendPlacement based on available window orientation
        var ratio = window.innerWidth / window.innerHeight;
        if (ratio < 0.8) {
          this.setState({ legendPlacement: 'bottom' });
        } else if (ratio > 1.2) {
          this.setState({ legendPlacement: 'right' });
        }
      }

      if ('right' === legendPlacement) {
        if (this.legendRef) {
          var graphicHeight = this.activeGraphicRef.offsetHeight;
          var legendHeight = _reactDom2.default.findDOMNode(this.legendRef).offsetHeight;
          this.setState({ tallLegend: legendHeight > graphicHeight });
        }
      }
    }
  }, {
    key: '_normalizeSeries',
    value: function _normalizeSeries(props, min, max, thresholds) {
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
        var priorValue = min.value;
        thresholds.push({ hidden: true });
        for (var i = 0; i < props.thresholds.length; i += 1) {
          var threshold = props.thresholds[i];
          // The value for the prior threshold ends at the beginning of this
          // threshold. Series drawing code expects the end value.
          thresholds[i].value = threshold.value - priorValue;
          thresholds.push({
            label: threshold.label,
            colorIndex: threshold.colorIndex,
            ariaLabel: threshold.value + ' ' + (props.units || '') + ' ' + (threshold.label || '')
          });
          priorValue = threshold.value;
          if (i === props.thresholds.length - 1) {
            thresholds[thresholds.length - 1].value = max.value - priorValue;
          }
        }
      } else if (props.threshold) {
        // let remaining = max.value - props.threshold;
        thresholds = [{ value: props.threshold, hidden: true }, {
          value: max.value - props.threshold,
          colorIndex: 'critical',
          ariaLabel: props.threshold + ' ' + (props.units || '')
        }];
      }
      return thresholds;
    }
  }, {
    key: '_importantIndex',
    value: function _importantIndex(props, series) {
      var result = undefined;
      // removed to ensure important is set solely based on props
      // if (series.length === 1) {
      //   result = 0;
      // }
      if (props.hasOwnProperty('important')) {
        console.warn('Meter: important prop has been deprecated. ' + 'Use a activeIndex instead.');
        result = props.important;
      }
      series.some(function (data, index) {
        if (data.important) {
          console.warn('Meter: seriesp[].important has been deprecated. ' + 'Use a activeIndex instead.');
          result = index;
          return true;
        }
        return false;
      });
      return result;
    }

    // Normalize min or max to an object.

  }, {
    key: '_terminal',
    value: function _terminal(terminal) {
      if (typeof terminal === 'number') {
        terminal = { value: terminal };
      }
      return terminal;
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
      var min = this._terminal(props.min || 0);
      // Max could be provided in props or come from the total of
      // a multi-value series.
      var max = this._terminal(props.max || (props.stacked ? Math.max(seriesMax, total || 0, 100) : seriesMax || Math.max(total || 0, 100)));
      // Normalize simple threshold prop to an array, if needed.
      var thresholds = this._normalizeThresholds(props, min, max);
      // Normalize simple value prop to a series, if needed.
      var series = this._normalizeSeries(props, min, max, thresholds);
      // Determine important index.
      var importantIndex = this._importantIndex(props, series);

      var state = {
        importantIndex: importantIndex,
        // we should preserve activeIndex across property updates
        // activeIndex: importantIndex,
        series: series,
        thresholds: thresholds,
        min: min,
        max: max,
        total: total
      };

      if (props.hasOwnProperty('activeIndex')) {
        state.activeIndex = props.activeIndex;
      } else if (props.hasOwnProperty('active')) {
        state.activeIndex = props.active ? 0 : undefined;
      }

      // legend
      state.placeLegend = !(props.legend && props.legend.placement);
      if (!state.placeLegend) {
        state.legendPlacement = props.legend.placement;
      }

      return state;
    }
  }, {
    key: '_getActiveFields',
    value: function _getActiveFields() {
      var _state2 = this.state;
      var activeIndex = _state2.activeIndex;
      var total = _state2.total;
      var series = _state2.series;

      var fields = void 0;
      if (undefined === activeIndex) {
        fields = {
          value: total
        };
        if (series.length > 1) {
          fields.label = _Intl2.default.getMessage(this.context.intl, 'Total');
        }
      } else {
        var active = series[activeIndex];
        if (!active) {
          active = series[0];
        }
        if (active.label) {
          console.warn('Meter: series[].label has been deprecated. ' + 'Use a separate Label instead.');
        }
        fields = {
          value: active.value,
          label: active.label,
          onClick: active.onClick
        };
      }
      return fields;
    }
  }, {
    key: '_renderActiveValue',
    value: function _renderActiveValue() {
      var fields = this._getActiveFields();
      var classes = [CLASS_ROOT + '__value'];
      if (fields.onClick) {
        classes.push(CLASS_ROOT + '__value--active');
      }
      var units = void 0;
      if (this.props.units) {
        console.warn('Meter: units prop has been deprecated. ' + 'Use a separate Label instead.');
        units = _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + '__value-units large-number-font' },
          this.props.units
        );
      }

      return _react2.default.createElement(
        'div',
        { 'aria-hidden': 'true', role: 'presentation',
          className: classes.join(' '), onClick: fields.onClick },
        _react2.default.createElement(
          'span',
          {
            className: CLASS_ROOT + '__value-value large-number-font' },
          fields.value,
          units
        ),
        _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + '__value-label' },
          fields.label
        )
      );
    }
  }, {
    key: '_renderMinMax',
    value: function _renderMinMax(classes) {
      var _state3 = this.state;
      var min = _state3.min;
      var max = _state3.max;

      var minLabel = void 0;
      if (min.label) {
        console.warn('Meter: min.label has been deprecated. ' + 'Use a separate Label instead.');
        minLabel = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__minmax-min' },
          min.label
        );
      }
      var maxLabel = void 0;
      if (max.label) {
        console.warn('Meter: max.label has been deprecated. ' + 'Use a separate Label instead.');
        maxLabel = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__minmax-max' },
          max.label
        );
      }
      var minMax = void 0;
      if (minLabel || maxLabel) {
        minMax = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__minmax-container' },
          _react2.default.createElement(
            'div',
            { className: CLASS_ROOT + '__minmax' },
            minLabel,
            maxLabel
          )
        );
        classes.push(CLASS_ROOT + '--minmax');
      }
      return minMax;
    }
  }, {
    key: '_renderLegend',
    value: function _renderLegend() {
      var _this2 = this;

      var _props = this.props;
      var legend = _props.legend;
      var units = _props.units;
      var _state4 = this.state;
      var activeIndex = _state4.activeIndex;
      var series = _state4.series;

      var total = (typeof legend === 'undefined' ? 'undefined' : (0, _typeof3.default)(legend)) === 'object' && legend.total;
      return _react2.default.createElement(_Legend2.default, { ref: function ref(_ref) {
          return _this2.legendRef = _ref;
        },
        className: CLASS_ROOT + '__legend',
        series: series, units: units, total: total,
        activeIndex: activeIndex, onActive: this._onActivate });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props;
      var active = _props2.active;
      var label = _props2.label;
      var legend = _props2.legend;
      var size = _props2.size;
      var stacked = _props2.stacked;
      var tabIndex = _props2.tabIndex;
      var type = _props2.type;
      var vertical = _props2.vertical;
      var _state5 = this.state;
      var legendPlacement = _state5.legendPlacement;
      var limitMeterSize = _state5.limitMeterSize;
      var tallLegend = _state5.tallLegend;
      var series = _state5.series;

      var classes = [CLASS_ROOT];
      classes.push(CLASS_ROOT + '--' + type);
      if (vertical) {
        classes.push(CLASS_ROOT + '--vertical');
      }
      if (stacked) {
        classes.push(CLASS_ROOT + '--stacked');
      }
      if (size) {
        var responsiveSize = size;
        // shrink Meter to medium size if large and up
        if (limitMeterSize && (size === 'large' || size === 'xlarge')) {
          responsiveSize = 'medium';
        }
        classes.push(CLASS_ROOT + '--' + responsiveSize);
      }
      if (series.length === 0) {
        classes.push(CLASS_ROOT + '--loading');
      } else if (series.length === 1) {
        classes.push(CLASS_ROOT + '--single');
      } else {
        classes.push(CLASS_ROOT + '--count-' + series.length);
      }
      if (active) {
        classes.push(CLASS_ROOT + '--active');
      }
      if (tallLegend) {
        classes.push(CLASS_ROOT + '--tall-legend');
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var restProps = _Props2.default.omit(this.props, (0, _keys2.default)(Meter.propTypes));

      var minMax = this._renderMinMax(classes);
      var labelElement = void 0;
      if (label && true !== label) {
        labelElement = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__label' },
          label
        );
      } else if (label && series.length > 0) {
        labelElement = this._renderActiveValue();
      }
      var legendElement = void 0;

      if (legend || series) {

        if (legend) {
          console.warn('Meter: legend prop has been deprecated. ' + 'Use a separate Legend instead.');
          if ('inline' !== legend.placement) {
            legendElement = this._renderLegend();
          } else {
            // Hide value (displaying total), if legend is inline
            // and total is set to false
            if (!legend.total && true === label) {
              labelElement = undefined;
            }
          }
          classes.push(CLASS_ROOT + '--legend-' + legendPlacement);
          if (legend.align) {
            classes.push(CLASS_ROOT + '--legend-align-' + legend.align);
          }
        }
      }

      var GraphicComponent = TYPE_COMPONENT[this.props.type];
      var graphic = _react2.default.createElement(GraphicComponent, {
        a11yTitle: this.props.a11yTitle,
        activeIndex: this.state.activeIndex,
        min: this.state.min, max: this.state.max,
        legend: legend,
        onActivate: this._onActivate,
        series: series,
        stacked: stacked,
        tabIndex: tabIndex,
        thresholds: this.state.thresholds,
        total: this.state.total,
        units: this.props.units,
        vertical: vertical });

      var graphicContainer = _react2.default.createElement(
        'div',
        (0, _extends3.default)({}, restProps, { className: CLASS_ROOT + '__graphic-container' }),
        graphic,
        minMax
      );

      return _react2.default.createElement(
        'div',
        { className: classes.join(' ') },
        _react2.default.createElement(
          'div',
          { ref: function ref(_ref2) {
              return _this3.activeGraphicRef = _ref2;
            },
            className: CLASS_ROOT + '__value-container' },
          graphicContainer,
          labelElement
        ),
        legendElement
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
  important: _react.PropTypes.number, // remove in 1.0, use activeIndex
  label: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.node]),
  // remove PropTypes.bool in 1.0
  legend: _react.PropTypes.oneOfType([// remove in 1.0
  _react.PropTypes.bool, _react.PropTypes.shape({
    align: _react.PropTypes.oneOf(['start', 'center', 'end']),
    placement: _react.PropTypes.oneOf(['right', 'bottom', 'inline']),
    total: _react.PropTypes.bool
  })]),
  max: _react.PropTypes.oneOfType([_react.PropTypes.shape({ // remove in 1.0
    value: _react.PropTypes.number.isRequired,
    label: _react.PropTypes.string
  }), _react.PropTypes.number]),
  min: _react.PropTypes.oneOfType([_react.PropTypes.shape({ // remove in 1.0
    value: _react.PropTypes.number.isRequired,
    label: _react.PropTypes.string
  }), _react.PropTypes.number]),
  onActive: _react.PropTypes.func,
  series: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.string, // remove in 1.0
    value: _react.PropTypes.number.isRequired,
    colorIndex: _react.PropTypes.string,
    important: _react.PropTypes.bool, // remove in 1.0, use activeIndex
    onClick: _react.PropTypes.func
  })),
  size: _react.PropTypes.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge']),
  stacked: _react.PropTypes.bool,
  tabIndex: _react.PropTypes.string,
  threshold: _react.PropTypes.number,
  thresholds: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.string, // remove in 1.0?
    value: _react.PropTypes.number.isRequired,
    colorIndex: _react.PropTypes.string
  })),
  type: _react.PropTypes.oneOf(['bar', 'arc', 'circle', 'spiral']),
  units: _react.PropTypes.string, // remove in 1.0, have caller use label
  value: _react.PropTypes.number,
  vertical: _react.PropTypes.bool,
  responsive: _react.PropTypes.bool
};

Meter.defaultProps = {
  label: true,
  type: 'bar'
};

Meter.contextTypes = {
  intl: _react.PropTypes.object
};
module.exports = exports['default'];