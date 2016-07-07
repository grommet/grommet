'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.METER;

var TYPE_COMPONENT = {
  'bar': _Bar2.default,
  'circle': _Circle2.default,
  'arc': _Arc2.default,
  'spiral': _Spiral2.default
};

var Meter = function (_Component) {
  (0, _inherits3.default)(Meter, _Component);

  function Meter(props) {
    (0, _classCallCheck3.default)(this, Meter);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Meter).call(this));

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
      if (index === null) {
        index = this.state.importantIndex;
      }
      this.setState({ initial: false, activeIndex: index });
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
      if (this.state.placeLegend) {
        // legendPlacement based on available window orientation
        var ratio = window.innerWidth / window.innerHeight;
        if (ratio < 0.8) {
          this.setState({ legendPlacement: 'bottom' });
        } else if (ratio > 1.2) {
          this.setState({ legendPlacement: 'right' });
        }
      }

      if ('right' === this.state.legendPlacement) {
        if (this.refs.legend) {
          var graphicHeight = this.refs.activeGraphic.offsetHeight;
          var legendHeight = _reactDom2.default.findDOMNode(this.refs.legend).offsetHeight;
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
        series = [{ value: props.value, important: true }];
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
      var result = null;
      if (series.length === 1) {
        result = 0;
      }
      if (props.hasOwnProperty('important')) {
        result = props.important;
      }
      series.some(function (data, index) {
        if (data.important) {
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
      var total = 0;
      series.some(function (item) {
        total += item.value;
      });
      return total;
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
        activeIndex: importantIndex,
        series: series,
        thresholds: thresholds,
        min: min,
        max: max,
        total: total
      };

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
      var fields = void 0;
      if (null === this.state.activeIndex) {
        fields = {
          value: this.state.total,
          label: _Intl2.default.getMessage(this.context.intl, 'Total')
        };
      } else {
        var active = this.state.series[this.state.activeIndex];
        if (!active) {
          active = this.state.series[0];
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
      var minLabel = void 0;
      if (this.state.min.label) {
        minLabel = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__minmax-min' },
          this.state.min.label
        );
      }
      var maxLabel = void 0;
      if (this.state.max.label) {
        maxLabel = _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__minmax-max' },
          this.state.max.label
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
      var total = (0, _typeof3.default)(this.props.legend) === 'object' && this.props.legend.total;
      return _react2.default.createElement(_Legend2.default, { ref: 'legend', className: CLASS_ROOT + '__legend',
        series: this.state.series,
        units: this.props.units,
        total: total,
        activeIndex: this.state.activeIndex,
        onActive: this._onActivate });
    }
  }, {
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      classes.push(CLASS_ROOT + '--' + this.props.type);
      if (this.props.vertical) {
        classes.push(CLASS_ROOT + '--vertical');
      }
      if (this.props.stacked) {
        classes.push(CLASS_ROOT + '--stacked');
      }
      if (this.props.size) {
        var responsiveSize = this.props.size;
        // shrink Meter to medium size if large and up
        if (this.state.limitMeterSize && (this.props.size === 'large' || this.props.size === 'xlarge')) {
          responsiveSize = 'medium';
        }
        classes.push(CLASS_ROOT + '--' + responsiveSize);
      }
      if (this.state.series.length === 0) {
        classes.push(CLASS_ROOT + '--loading');
      } else if (this.state.series.length === 1) {
        classes.push(CLASS_ROOT + '--single');
      } else {
        classes.push(CLASS_ROOT + '--count-' + this.state.series.length);
      }
      if (this.state.activeIndex !== null) {
        classes.push(CLASS_ROOT + '--active');
      }
      if (this.state.tallLegend) {
        classes.push(CLASS_ROOT + '--tall-legend');
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var minMax = this._renderMinMax(classes);
      var activeValue = void 0;
      if (this.state.series.length > 0) {
        activeValue = this._renderActiveValue();
      }
      var legend = void 0;
      var a11yRole = void 0;

      if (this.props.legend || this.props.series) {
        a11yRole = 'tablist';

        if (this.props.legend) {
          if ('inline' !== this.props.legend.placement) {
            legend = this._renderLegend();
          } else {
            // Hide value (displaying total), if legend is inline
            // and total is set to false
            if (!this.props.legend.total) {
              activeValue = null;
            }
          }
          classes.push(CLASS_ROOT + '--legend-' + this.state.legendPlacement);
          if (this.props.legend.align) {
            classes.push(CLASS_ROOT + '--legend-align-' + this.props.legend.align);
          }
        }
      }

      var GraphicComponent = TYPE_COMPONENT[this.props.type];
      var graphic = _react2.default.createElement(GraphicComponent, {
        a11yTitle: this.props.a11yTitle,
        a11yTitleId: this.props.a11yTitleId,
        a11yDesc: this.props.a11yDesc,
        a11yDescId: this.props.a11yDescId,
        a11yRole: a11yRole,
        activeIndex: this.state.activeIndex,
        min: this.state.min, max: this.state.max,
        legend: this.props.legend,
        onActivate: this._onActivate,
        series: this.state.series,
        stacked: this.props.stacked,
        thresholds: this.state.thresholds,
        total: this.state.total,
        units: this.props.units,
        vertical: this.props.vertical });

      var graphicContainer = _react2.default.createElement(
        'div',
        { className: CLASS_ROOT + '__graphic-container' },
        graphic,
        minMax
      );

      return _react2.default.createElement(
        'div',
        { className: classes.join(' ') },
        _react2.default.createElement(
          'div',
          { ref: 'activeGraphic', className: CLASS_ROOT + '__value-container' },
          graphicContainer,
          activeValue
        ),
        legend
      );
    }
  }]);
  return Meter;
}(_react.Component);

Meter.displayName = 'Meter';
exports.default = Meter;


Meter.propTypes = {
  a11yTitle: _react.PropTypes.string,
  a11yTitleId: _react.PropTypes.string,
  a11yDescId: _react.PropTypes.string,
  a11yDesc: _react.PropTypes.string,
  important: _react.PropTypes.number,
  legend: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.shape({
    align: _react.PropTypes.oneOf(['start', 'center', 'end']),
    placement: _react.PropTypes.oneOf(['right', 'bottom', 'inline']),
    total: _react.PropTypes.bool
  })]),
  max: _react.PropTypes.oneOfType([_react.PropTypes.shape({
    value: _react.PropTypes.number.isRequired,
    label: _react.PropTypes.string
  }), _react.PropTypes.number]),
  min: _react.PropTypes.oneOfType([_react.PropTypes.shape({
    value: _react.PropTypes.number.isRequired,
    label: _react.PropTypes.string
  }), _react.PropTypes.number]),
  size: _react.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  series: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.string,
    value: _react.PropTypes.number.isRequired,
    colorIndex: _react.PropTypes.string,
    important: _react.PropTypes.bool,
    onClick: _react.PropTypes.func
  })),
  stacked: _react.PropTypes.bool,
  threshold: _react.PropTypes.number,
  thresholds: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    label: _react.PropTypes.string,
    value: _react.PropTypes.number.isRequired,
    colorIndex: _react.PropTypes.string
  })),
  type: _react.PropTypes.oneOf(['bar', 'arc', 'circle', 'spiral']),
  units: _react.PropTypes.string,
  value: _react.PropTypes.number,
  vertical: _react.PropTypes.bool,
  responsive: _react.PropTypes.bool
};

Meter.defaultProps = {
  a11yTitleId: 'meter-title',
  a11yDescId: 'meter-desc',
  type: 'bar'
};

Meter.contextTypes = {
  intl: _react.PropTypes.object
};
module.exports = exports['default'];