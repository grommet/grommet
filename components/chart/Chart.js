'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Range = exports.HotSpots = exports.MarkerLabel = exports.Marker = exports.Bar = exports.Line = exports.Area = exports.Grid = exports.Base = exports.Layers = exports.Axis = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var CLASS_ROOT = _CSSClassnames2.default.CHART; // (C) Copyright 2016 Hewlett Packard Enterprise Development LP

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
  (0, _inherits3.default)(Chart, _Component);

  function Chart(props, context) {
    (0, _classCallCheck3.default)(this, Chart);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Chart.__proto__ || (0, _getPrototypeOf2.default)(Chart)).call(this, props, context));

    _this._onResize = _this._onResize.bind(_this);
    _this._layout = _this._layout.bind(_this);
    _this.state = { alignTop: 0, alignLeft: 0, alignHeight: 0, alignWidth: 0 };
    return _this;
  }

  (0, _createClass3.default)(Chart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('resize', this._onResize);
      // give sometime for the ui to render
      setTimeout(this._layout, 50);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.vertical !== nextProps.vertical) {
        this.setState({ layoutNeeded: true });
      }
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
      var _this2 = this;

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
          (function () {
            var maxCount = void 0;
            if (vertical) {
              maxCount = Math.floor(alignWidth / (4 * _utils.padding));
            } else {
              maxCount = Math.floor(alignHeight / (4 * _utils.padding));
            }
            if (maxCount !== _this2.state.maxCount) {
              _this2.setState({ maxCount: maxCount }, function () {
                onMaxCount(maxCount);
              });
            }
          })();
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames,
          _this3 = this;

      var _props2 = this.props,
          a11yTitle = _props2.a11yTitle,
          className = _props2.className,
          full = _props2.full,
          loading = _props2.loading,
          vertical = _props2.vertical,
          props = (0, _objectWithoutProperties3.default)(_props2, ['a11yTitle', 'className', 'full', 'loading', 'vertical']);

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

      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--full', full), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--loading', loading), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--vertical', vertical), _classnames), className);

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
        (0, _extends3.default)({ ref: function ref(_ref) {
            return _this3.chartRef = _ref;
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
;

Chart.contextTypes = {
  intl: _react.PropTypes.object
};

Chart.propTypes = {
  a11yTitle: _react.PropTypes.string,
  full: _react.PropTypes.bool,
  horizontalAlignWith: _react.PropTypes.string,
  loading: _react.PropTypes.bool,
  onMaxCount: _react.PropTypes.func,
  vertical: _react.PropTypes.bool,
  verticalAlignWith: _react.PropTypes.string
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