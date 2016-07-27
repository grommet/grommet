'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Range = exports.HotSpots = exports.MarkerLabel = exports.Marker = exports.Bar = exports.Line = exports.Area = exports.Grid = exports.Base = exports.Layers = exports.Axis = undefined;

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

var _utils = require('./utils');

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

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

// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.CHART;
var CHART_BASE = _CSSClassnames2.default.CHART_BASE;

var Chart = function (_Component) {
  (0, _inherits3.default)(Chart, _Component);

  function Chart() {
    (0, _classCallCheck3.default)(this, Chart);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Chart).call(this));

    _this._onResize = _this._onResize.bind(_this);
    _this._layout = _this._layout.bind(_this);
    _this.state = { alignTop: 0, alignLeft: 0, alignHeight: 0, alignWidth: 0 };
    return _this;
  }

  (0, _createClass3.default)(Chart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      window.addEventListener('resize', this._onResize);
      // this._onResize();
      setTimeout(this._layout, 1);
      // setTimeout(this._layout, 100);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      setTimeout(this._layout, 1);
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

      var _props = this.props;
      var horizontalAlignWith = _props.horizontalAlignWith;
      var verticalAlignWith = _props.verticalAlignWith;
      var vertical = _props.vertical;
      var onMaxCount = _props.onMaxCount;

      var chart = this.refs.chart;
      var chartRect = chart.getBoundingClientRect();
      var base = this.refs.chart.querySelector('.' + CHART_BASE);
      var alignWidth = void 0,
          alignLeft = void 0,
          alignTop = void 0,
          alignHeight = void 0;
      var padAlign = true;

      if (horizontalAlignWith) {
        var elem = document.getElementById(horizontalAlignWith);
        if (elem) {
          var rect = elem.getBoundingClientRect();
          alignWidth = rect.width;
          alignLeft = rect.left - chartRect.left;
          padAlign = false;
        }
      } else if (base) {
        var _rect = base.getBoundingClientRect();
        alignWidth = _rect.width;
        alignLeft = _rect.left - chartRect.left;
      }

      if (verticalAlignWith) {
        var _elem = document.getElementById(verticalAlignWith);
        if (_elem) {
          var _rect2 = _elem.getBoundingClientRect();
          alignHeight = _rect2.height;
          alignTop = _rect2.top - chartRect.top;
          padAlign = false;
        }
      } else if (base) {
        var _rect3 = base.getBoundingClientRect();
        alignHeight = _rect3.height;
        alignTop = _rect3.top - chartRect.top;
      }

      this.setState({
        alignWidth: alignWidth,
        alignLeft: alignLeft,
        alignHeight: alignHeight,
        alignTop: alignTop,
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
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var vertical = _props2.vertical;
      var full = _props2.full;
      var loading = _props2.loading;
      var _state = this.state;
      var alignHeight = _state.alignHeight;
      var alignLeft = _state.alignLeft;
      var alignTop = _state.alignTop;
      var alignWidth = _state.alignWidth;
      var padAlign = _state.padAlign;

      var classes = [CLASS_ROOT];
      if (vertical) {
        classes.push(CLASS_ROOT + '--vertical');
      }
      if (full) {
        classes.push(CLASS_ROOT + '--full');
      }
      if (loading) {
        classes.push(CLASS_ROOT + '--loading');
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      // Align Axis children towards the Base|Layers|Chart
      var axisAlign = 'end';
      var children = _react.Children.map(this.props.children, function (child) {

        // name comparison is to work around webpack alias issues in development
        if (child && (child.type === _Axis2.default || child.type.name === 'Axis' || child.type === _MarkerLabel2.default || child.type.name === 'MarkerLabel')) {

          if (vertical) {
            child = _react2.default.cloneElement(child, {
              width: padAlign ? alignWidth - 2 * _utils.padding : alignWidth,
              style: { marginLeft: padAlign ? alignLeft + _utils.padding : alignLeft },
              align: axisAlign
            });
          } else {
            child = _react2.default.cloneElement(child, {
              height: padAlign ? alignHeight - 2 * _utils.padding : alignHeight,
              style: { marginTop: padAlign ? alignTop + _utils.padding : alignTop },
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

          axisAlign = 'start';
        }

        return child;
      });

      if (loading) {
        children.push(_react2.default.createElement(
          'svg',
          { key: 'loading', className: CLASS_ROOT + '-loading',
            viewBox: '0 0 ' + alignWidth + ' ' + alignHeight },
          _react2.default.createElement('path', { d: 'M0,' + alignHeight / 2 + ' L' + alignWidth + ',' + alignHeight / 2 })
        ));
      }

      return _react2.default.createElement(
        'div',
        { ref: 'chart', className: classes.join(' ') },
        children
      );
    }
  }]);
  return Chart;
}(_react.Component);

Chart.displayName = 'Chart';
exports.default = Chart;
;

Chart.propTypes = {
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