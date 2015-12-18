// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _Legend = require('./Legend');

var _Legend2 = _interopRequireDefault(_Legend);

var _meterBar = require('./meter/Bar');

var _meterBar2 = _interopRequireDefault(_meterBar);

var _meterSpiral = require('./meter/Spiral');

var _meterSpiral2 = _interopRequireDefault(_meterSpiral);

var _meterCircle = require('./meter/Circle');

var _meterCircle2 = _interopRequireDefault(_meterCircle);

var _meterArc = require('./meter/Arc');

var _meterArc2 = _interopRequireDefault(_meterArc);

var CLASS_ROOT = "meter";

var TYPE_COMPONENT = {
  'bar': _meterBar2['default'],
  'circle': _meterCircle2['default'],
  'arc': _meterArc2['default'],
  'spiral': _meterSpiral2['default']
};

var Meter = (function (_Component) {
  _inherits(Meter, _Component);

  function Meter(props) {
    _classCallCheck(this, Meter);

    _get(Object.getPrototypeOf(Meter.prototype), 'constructor', this).call(this);

    this._initialTimeout = this._initialTimeout.bind(this);
    this._layout = this._layout.bind(this);
    this._onResize = this._onResize.bind(this);
    this._onActivate = this._onActivate.bind(this);

    this.state = this._stateFromProps(props);
    if (this.state.placeLegend) {
      this.state.legendPlacement = 'bottom';
    }
    this.state.initial = true;
  }

  _createClass(Meter, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
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
          var legendHeight = _reactDom2['default'].findDOMNode(this.refs.legend).offsetHeight;
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
        var total = 0;
        for (var i = 0; i < props.thresholds.length; i += 1) {
          var threshold = props.thresholds[i];
          thresholds.push({
            label: threshold.label,
            colorIndex: threshold.colorIndex,
            ariaLabel: threshold.value + ' ' + (props.units || '') + ' ' + (threshold.label || '')
          });
          if (i > 0) {
            thresholds[i - 1].value = threshold.value - total;
            total += thresholds[i - 1].value;
          }
          if (i === props.thresholds.length - 1) {
            thresholds[i].value = max.value - total;
          }
        }
      } else if (props.threshold) {
        var remaining = max.value - props.threshold;
        thresholds = [{
          value: props.threshold,
          colorIndex: 'unset',
          ariaLabel: props.threshold + ' ' + (props.units || '')
        }, { value: remaining, colorIndex: 'critical' }];
      } else {
        thresholds = [{ value: max.value, colorIndex: 'unset' }];
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
      var total = undefined;
      if (props.series && props.series.length > 1) {
        total = this._seriesTotal(props.series);
      } else if (props.max && props.max.value) {
        total = props.max.value;
      } else {
        total = 100;
      }
      var seriesMax = undefined;
      if (props.series && 'spiral' === props.type) {
        seriesMax = this._seriesMax(props.series);
      }
      // Normalize min and max
      var min = this._terminal(props.min || 0);
      // Max could be provided in props or come from the total of
      // a multi-value series.
      var max = this._terminal(props.max || seriesMax || total);
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
      var fields = undefined;
      if (null === this.state.activeIndex) {
        fields = { value: this.state.total, label: 'Total' };
      } else {
        var active = this.state.series[this.state.activeIndex];
        if (!active) {
          active = this.state.series[0];
        }
        fields = { value: active.value, label: active.label, onClick: active.onClick };
      }
      return fields;
    }
  }, {
    key: '_renderActiveValue',
    value: function _renderActiveValue() {
      var fields = this._getActiveFields();
      var classes = [CLASS_ROOT + "__value"];
      if (fields.onClick) {
        classes.push(CLASS_ROOT + "__value--active");
      }
      var units = undefined;
      if (this.props.units) {
        units = _react2['default'].createElement(
          'span',
          { className: CLASS_ROOT + "__value-units large-number-font" },
          this.props.units
        );
      }

      return _react2['default'].createElement(
        'div',
        { 'aria-hidden': 'true', role: 'presentation',
          className: classes.join(' '), onClick: fields.onClick },
        _react2['default'].createElement(
          'span',
          {
            className: CLASS_ROOT + "__value-value large-number-font" },
          fields.value,
          units
        ),
        _react2['default'].createElement(
          'span',
          { className: CLASS_ROOT + "__value-label" },
          fields.label
        )
      );
    }
  }, {
    key: '_renderMinMax',
    value: function _renderMinMax(classes) {
      var minLabel = undefined;
      if (this.state.min.label) {
        minLabel = _react2['default'].createElement(
          'div',
          { className: CLASS_ROOT + "__minmax-min" },
          this.state.min.label
        );
      }
      var maxLabel = undefined;
      if (this.state.max.label) {
        maxLabel = _react2['default'].createElement(
          'div',
          { className: CLASS_ROOT + "__minmax-max" },
          this.state.max.label
        );
      }
      var minMax = undefined;
      if (minLabel || maxLabel) {
        minMax = _react2['default'].createElement(
          'div',
          { className: CLASS_ROOT + "__minmax-container" },
          _react2['default'].createElement(
            'div',
            { className: CLASS_ROOT + "__minmax" },
            minLabel,
            maxLabel
          )
        );
        classes.push(CLASS_ROOT + "--minmax");
      }
      return minMax;
    }
  }, {
    key: '_renderLegend',
    value: function _renderLegend() {
      var total = typeof this.props.legend === 'object' && this.props.legend.total;
      return _react2['default'].createElement(_Legend2['default'], { ref: 'legend', className: CLASS_ROOT + "__legend",
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
      classes.push(CLASS_ROOT + "--" + this.props.type);
      if (this.props.vertical) {
        classes.push(CLASS_ROOT + "--vertical");
      }
      if (this.props.stacked) {
        classes.push(CLASS_ROOT + "--stacked");
      }
      if (this.props.size) {
        classes.push(CLASS_ROOT + "--" + this.props.size);
      }
      if (this.state.series.length === 0) {
        classes.push(CLASS_ROOT + "--loading");
      } else if (this.state.series.length === 1) {
        classes.push(CLASS_ROOT + "--single");
      }
      if (this.state.activeIndex !== null) {
        classes.push(CLASS_ROOT + "--active");
      }
      if (this.state.tallLegend) {
        classes.push(CLASS_ROOT + "--tall-legend");
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      var minMax = this._renderMinMax(classes);

      var activeValue = this._renderActiveValue();

      var legend = undefined;
      var a11yRole = undefined;
      if (this.props.legend || this.props.type === 'spiral') {
        a11yRole = 'tablist';

        if (this.props.legend) {
          legend = this._renderLegend();
          classes.push(CLASS_ROOT + "--legend-" + this.state.legendPlacement);
        }
      }

      var GraphicComponent = TYPE_COMPONENT[this.props.type];
      var graphic = _react2['default'].createElement(GraphicComponent, {
        a11yTitle: this.props.a11yTitle,
        a11yTitleId: this.props.a11yTitleId,
        a11yDesc: this.props.a11yDesc,
        a11yDescId: this.props.a11yDescId,
        a11yRole: a11yRole,
        activeIndex: this.state.activeIndex,
        min: this.state.min, max: this.state.max,
        onActivate: this._onActivate,
        series: this.state.series,
        stacked: this.props.stacked,
        thresholds: this.state.thresholds,
        total: this.state.total,
        units: this.props.units,
        vertical: this.props.vertical });

      var graphicContainer = undefined;
      if (this.state.total > 0) {
        graphicContainer = _react2['default'].createElement(
          'div',
          { className: CLASS_ROOT + "__graphic-container" },
          graphic,
          minMax
        );
      }

      return _react2['default'].createElement(
        'div',
        { className: classes.join(' ') },
        _react2['default'].createElement(
          'div',
          { ref: 'activeGraphic', className: CLASS_ROOT + "__value-container" },
          graphicContainer,
          activeValue
        ),
        legend
      );
    }
  }]);

  return Meter;
})(_react.Component);

Meter.propTypes = {
  a11yTitle: _react.PropTypes.string,
  a11yTitleId: _react.PropTypes.string,
  a11yDescId: _react.PropTypes.string,
  a11yDesc: _react.PropTypes.string,
  important: _react.PropTypes.number,
  legend: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.shape({
    total: _react.PropTypes.bool,
    placement: _react.PropTypes.oneOf(['right', 'bottom'])
  })]),
  max: _react.PropTypes.oneOfType([_react.PropTypes.shape({
    value: _react.PropTypes.number.isRequired,
    label: _react.PropTypes.string
  }), _react.PropTypes.number]),
  min: _react.PropTypes.oneOfType([_react.PropTypes.shape({
    value: _react.PropTypes.number.isRequired,
    label: _react.PropTypes.string
  }), _react.PropTypes.number]),
  size: _react.PropTypes.oneOf(['small', 'medium', 'large']),
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
  vertical: _react.PropTypes.bool
};

Meter.defaultProps = {
  a11yTitleId: 'meter-title',
  a11yDescId: 'meter-desc',
  type: 'bar'
};

Meter.contextTypes = {
  intl: _react.PropTypes.object
};

module.exports = Meter;