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

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.CHART_MARKER;
var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;

var DOUBLE_PADDING = 2 * _utils.padding;

var Marker = function (_Component) {
  _inherits(Marker, _Component);

  function Marker(props, context) {
    _classCallCheck(this, Marker);

    var _this = _possibleConstructorReturn(this, (Marker.__proto__ || Object.getPrototypeOf(Marker)).call(this, props, context));

    _this.state = {
      size: { width: 0, height: 0 },
      graphHeight: 0,
      graphWidth: 0
    };
    _this._size = new _utils.trackSize(props, _this._onSize.bind(_this));
    return _this;
  }

  _createClass(Marker, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._size.start(this.svgRef);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      this._size.reset(nextProps);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._size.stop();
    }
  }, {
    key: '_onSize',
    value: function _onSize(size) {
      this.setState({
        size: size,
        graphWidth: size.width - DOUBLE_PADDING,
        graphHeight: size.height - DOUBLE_PADDING
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          colorIndex = _props.colorIndex,
          count = _props.count,
          index = _props.index,
          max = _props.max,
          min = _props.min,
          reverse = _props.reverse,
          value = _props.value,
          vertical = _props.vertical,
          props = _objectWithoutProperties(_props, ['className', 'colorIndex', 'count', 'index', 'max', 'min', 'reverse', 'value', 'vertical']);

      delete props.height;
      delete props.width;
      var _state = this.state,
          _state$size = _state.size,
          height = _state$size.height,
          width = _state$size.width,
          graphWidth = _state.graphWidth,
          graphHeight = _state.graphHeight;

      var classes = (0, _classnames3.default)(CLASS_ROOT, _defineProperty({}, COLOR_INDEX + '-' + colorIndex, colorIndex), className);

      var path = void 0;
      if (count > 1 && index >= 1 && index < count || value >= min && value <= max) {
        var commands = '';

        if (vertical) {
          var x = void 0;
          if (count) {
            x = (0, _utils.graphValue)(index, 0, count - 1, graphWidth);
          } else if (max) {
            x = (0, _utils.graphValue)(value, min, max, graphWidth);
          }
          if (reverse) {
            x = graphWidth - x;
          }
          commands = 'M' + (x + _utils.padding) + ',0 L' + (x + _utils.padding) + ',' + height;
        } else {
          var y = void 0;
          if (count) {
            y = (0, _utils.graphValue)(index, 0, count - 1, graphHeight);
          } else if (max) {
            y = (0, _utils.graphValue)(value, min, max, graphHeight);
          }
          if (!reverse) {
            y = graphHeight - y;
          }
          commands = 'M0,' + (y + _utils.padding) + ' L' + width + ',' + (y + _utils.padding);
        }

        path = _react2.default.createElement('path', { fill: 'none', d: commands });
      }

      return _react2.default.createElement(
        'svg',
        _extends({ ref: function ref(_ref) {
            return _this2.svgRef = _ref;
          } }, props, { className: classes,
          viewBox: '0 0 ' + width + ' ' + height, 'aria-hidden': 'true',
          preserveAspectRatio: 'none' }),
        path
      );
    }
  }]);

  return Marker;
}(_react.Component);

// Need either count and index or value, min, and max


Marker.displayName = 'Marker';
exports.default = Marker;
Marker.propTypes = {
  colorIndex: _propTypes2.default.string,
  count: _propTypes2.default.number,
  index: _propTypes2.default.number,
  max: _propTypes2.default.number,
  min: _propTypes2.default.number,
  reverse: _propTypes2.default.bool,
  value: _propTypes2.default.number,
  vertical: _propTypes2.default.bool
};

Marker.defaultProps = {
  max: 100,
  min: 0
};
module.exports = exports['default'];