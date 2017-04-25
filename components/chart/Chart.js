'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Range = exports.HotSpots = exports.MarkerLabel = exports.Marker = exports.Bar = exports.Line = exports.Area = exports.Grid = exports.Base = exports.Layers = exports.Axis = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Intl = require('../../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _utils = require('./utils');

var _Meter = require('../Meter');

var _Meter2 = _interopRequireDefault(_Meter);

var _Axis = require('./Axis');

var _Axis2 = _interopRequireDefault(_Axis);

var _Layers = require('./Layers');

var _Layers2 = _interopRequireDefault(_Layers);

var _Base = require('./Base');

var _Base2 = _interopRequireDefault(_Base);

var _Grid = require('./Grid');

var _Grid2 = _interopRequireDefault(_Grid);

var _Area = require('./Area');

var _Area2 = _interopRequireDefault(_Area);

var _Line = require('./Line');

var _Line2 = _interopRequireDefault(_Line);

var _Bar = require('./Bar');

var _Bar2 = _interopRequireDefault(_Bar);

var _Marker = require('./Marker');

var _Marker2 = _interopRequireDefault(_Marker);

var _MarkerLabel = require('./MarkerLabel');

var _MarkerLabel2 = _interopRequireDefault(_MarkerLabel);

var _HotSpots = require('./HotSpots');

var _HotSpots2 = _interopRequireDefault(_HotSpots);

var _Range = require('./Range');

var _Range2 = _interopRequireDefault(_Range);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.CHART;
var CHART_BASE = _CSSClassnames2.default.CHART_BASE;

function traverseAndUpdateChildren(children) {
  return _react.Children.map(children, function (child) {
    if (!child || !child.type) {
      return child;
    }

    // remove tabIndex from child elements to avoid
    // multiple tabs inside a chart
    if (child.type === _Meter2.default || child.type.name === 'Meter' || child.type === Chart || child.type.name === 'Chart') {
      return _react2.default.cloneElement(child, {
        tabIndex: '-1'
      });
    }

    if (child.props.children) {
      var childrenNoTabIndex = traverseAndUpdateChildren(child.props.children);

      return _react2.default.cloneElement(child, {
        children: childrenNoTabIndex
      });
    }
    return child;
  });
}

var Chart = function (_Component) {
  _inherits(Chart, _Component);

  function Chart(props, context) {
    _classCallCheck(this, Chart);

    var _this = _possibleConstructorReturn(this, (Chart.__proto__ || Object.getPrototypeOf(Chart)).call(this, props, context));

    _this._onResize = _this._onResize.bind(_this);
    _this._layout = _this._layout.bind(_this);
    _this.state = { alignTop: 0, alignLeft: 0, alignHeight: 0, alignWidth: 0 };
    return _this;
  }

  _createClass(Chart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('resize', this._onResize);
      // Give sometime for the ui to render. Why is this needed though?
      setTimeout(this._layout, 150);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // Always layout when new props come. This takes care of a contained
      // Base having children that change.
      this.setState({ layoutNeeded: true });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (this.state.layoutNeeded) {
        this._layout();
        this.setState({ layoutNeeded: false });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this._onResize);
    }
  }, {
    key: '_onResize',
    value: function _onResize() {
      // debounce
      clearTimeout(this._resizeTimer);
      this._resizeTimer = setTimeout(this._layout, _utils.debounceDelay);
    }
  }, {
    key: '_layout',
    value: function _layout() {
      var _props = this.props,
          horizontalAlignWith = _props.horizontalAlignWith,
          verticalAlignWith = _props.verticalAlignWith,
          vertical = _props.vertical,
          onMaxCount = _props.onMaxCount;

      var chart = this.chartRef;
      if (chart) {
        var chartRect = chart.getBoundingClientRect();
        var base = this.chartRef.querySelector('.' + CHART_BASE);
        var alignWidth = void 0,
            alignLeft = void 0,
            alignRight = void 0,
            alignHeight = void 0,
            alignTop = void 0,
            alignBottom = void 0;
        var padAlign = true;

        if (horizontalAlignWith) {
          var elem = document.getElementById(horizontalAlignWith);
          if (elem) {
            var rect = elem.getBoundingClientRect();
            alignWidth = rect.width;
            alignLeft = rect.left - chartRect.left;
            alignRight = chartRect.right - rect.right;
            padAlign = false;
          }
        } else if (base) {
          var _rect = base.getBoundingClientRect();
          alignWidth = _rect.width;
          alignLeft = _rect.left - chartRect.left;
          alignRight = chartRect.right - _rect.right;
        }

        if (verticalAlignWith) {
          var _elem = document.getElementById(verticalAlignWith);
          if (_elem) {
            var _rect2 = _elem.getBoundingClientRect();
            alignHeight = _rect2.height;
            alignTop = _rect2.top - chartRect.top;
            alignBottom = chartRect.bottom - _rect2.bottom;
            padAlign = false;
          }
        } else if (base) {
          var _rect3 = base.getBoundingClientRect();
          alignHeight = _rect3.height;
          alignTop = _rect3.top - chartRect.top;
          alignBottom = chartRect.bottom - _rect3.bottom;
        }

        this.setState({
          alignWidth: alignWidth,
          alignLeft: alignLeft,
          alignRight: alignRight,
          alignHeight: alignHeight,
          alignTop: alignTop,
          alignBottom: alignBottom,
          padAlign: padAlign
        });

        if (onMaxCount) {
          var maxCount = void 0;
          if (vertical) {
            maxCount = Math.floor(alignWidth / (4 * _utils.padding));
          } else {
            maxCount = Math.floor(alignHeight / (4 * _utils.padding));
          }
          if (maxCount !== this.state.maxCount) {
            this.setState({ maxCount: maxCount }, function () {
              onMaxCount(maxCount);
            });
          }
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames,
          _this2 = this;

      var _props2 = this.props,
          a11yTitle = _props2.a11yTitle,
          className = _props2.className,
          full = _props2.full,
          loading = _props2.loading,
          vertical = _props2.vertical,
          props = _objectWithoutProperties(_props2, ['a11yTitle', 'className', 'full', 'loading', 'vertical']);

      delete props.horizontalAlignWith;
      delete props.onMaxCount;
      delete props.verticalAlignWith;
      var _state = this.state,
          alignBottom = _state.alignBottom,
          alignHeight = _state.alignHeight,
          alignLeft = _state.alignLeft,
          alignRight = _state.alignRight,
          alignTop = _state.alignTop,
          alignWidth = _state.alignWidth,
          padAlign = _state.padAlign;
      var intl = this.context.intl;

      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--full', full), _defineProperty(_classnames, CLASS_ROOT + '--loading', loading), _defineProperty(_classnames, CLASS_ROOT + '--vertical', vertical), _classnames), className);

      // Align Axis children towards the Base|Layers|Chart
      var axisAlign = 'end';
      var children = _react.Children.map(this.props.children, function (child) {

        // name comparison is to work around webpack alias issues in development
        if (child && (child.type === _Axis2.default || child.type.name === 'Axis' || child.type === _MarkerLabel2.default || child.type.name === 'MarkerLabel')) {

          if (vertical) {
            child = _react2.default.cloneElement(child, {
              style: {
                marginLeft: padAlign ? alignLeft + _utils.padding : alignLeft,
                marginRight: padAlign ? alignRight + _utils.padding : alignRight
              },
              align: axisAlign
            });
          } else {
            child = _react2.default.cloneElement(child, {
              style: {
                // We set the height just for Safari due to:
                // http://stackoverflow.com/questions/35532987/
                //    heights-rendering-differently-in-chrome-and-firefox/
                //    35537510#35537510
                // Chrome seems to have addressed this already.
                height: padAlign ? alignHeight - 2 * _utils.padding : alignHeight,
                marginTop: padAlign ? alignTop + _utils.padding : alignTop,
                marginBottom: padAlign ? alignBottom + _utils.padding : alignBottom
              },
              align: axisAlign
            });
          }
        } else if (child && (child.type === _Layers2.default || child.type.name === 'Layers')) {

          child = _react2.default.cloneElement(child, {
            height: alignHeight,
            width: alignWidth,
            style: { left: alignLeft, top: alignTop }
          });
          axisAlign = 'start';
        } else if (child && (child.type === Chart || child.type.name === 'Chart' || child.type === _Base2.default || child.type.name === 'Base')) {

          if (child.type === _Base2.default) {
            var updatedChildren = traverseAndUpdateChildren(child.props.children);

            child = _react2.default.cloneElement(child, {
              children: updatedChildren
            });
          } else {
            child = _react2.default.cloneElement(child, {
              tabIndex: '-1'
            });
          }

          axisAlign = 'start';
        }

        return child;
      });

      if (loading) {
        children.push(_react2.default.createElement(
          'svg',
          { key: 'loading', className: classes,
            viewBox: '0 0 ' + alignWidth + ' ' + alignHeight },
          _react2.default.createElement('path', { d: 'M0,' + alignHeight / 2 + ' L' + alignWidth + ',' + alignHeight / 2 })
        ));
      }

      var ariaLabel = a11yTitle || _Intl2.default.getMessage(intl, 'Chart');

      return _react2.default.createElement(
        'div',
        _extends({ ref: function ref(_ref) {
            return _this2.chartRef = _ref;
          } }, props, { className: classes,
          'aria-label': ariaLabel, role: 'group' }),
        children
      );
    }
  }]);

  return Chart;
}(_react.Component);

Chart.displayName = 'Chart';
exports.default = Chart;


Chart.contextTypes = {
  intl: _propTypes2.default.object
};

Chart.propTypes = {
  a11yTitle: _propTypes2.default.string,
  full: _propTypes2.default.bool,
  horizontalAlignWith: _propTypes2.default.string,
  loading: _propTypes2.default.bool,
  onMaxCount: _propTypes2.default.func,
  vertical: _propTypes2.default.bool,
  verticalAlignWith: _propTypes2.default.string
};

exports.Axis = _Axis2.default;
exports.Layers = _Layers2.default;
exports.Base = _Base2.default;
exports.Grid = _Grid2.default;
exports.Area = _Area2.default;
exports.Line = _Line2.default;
exports.Bar = _Bar2.default;
exports.Marker = _Marker2.default;
exports.MarkerLabel = _MarkerLabel2.default;
exports.HotSpots = _HotSpots2.default;
exports.Range = _Range2.default;