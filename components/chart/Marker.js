'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.CHART_MARKER;
var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;

var DOUBLE_PADDING = 2 * _utils.padding;

var Marker = function (_Component) {
  (0, _inherits3.default)(Marker, _Component);

  function Marker(props, context) {
    (0, _classCallCheck3.default)(this, Marker);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Marker.__proto__ || (0, _getPrototypeOf2.default)(Marker)).call(this, props, context));

    _this.state = {
      size: { width: 0, height: 0 },
      graphHeight: 0,
      graphWidth: 0
    };
    _this._size = new _utils.trackSize(props, _this._onSize.bind(_this));
    return _this;
  }

  (0, _createClass3.default)(Marker, [{
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
          props = (0, _objectWithoutProperties3.default)(_props, ['className', 'colorIndex', 'count', 'index', 'max', 'min', 'reverse', 'value', 'vertical']);

      delete props.height;
      delete props.width;
      var _state = this.state,
          _state$size = _state.size,
          height = _state$size.height,
          width = _state$size.width,
          graphWidth = _state.graphWidth,
          graphHeight = _state.graphHeight;

      var classes = (0, _classnames3.default)(CLASS_ROOT, (0, _defineProperty3.default)({}, COLOR_INDEX + '-' + colorIndex, colorIndex), className);

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
        (0, _extends3.default)({ ref: function ref(_ref) {
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

Marker.displayName = 'Marker';
exports.default = Marker;
;

// Need either count and index or value, min, and max
Marker.propTypes = {
  colorIndex: _react.PropTypes.string,
  count: _react.PropTypes.number,
  index: _react.PropTypes.number,
  max: _react.PropTypes.number,
  min: _react.PropTypes.number,
  reverse: _react.PropTypes.bool,
  value: _react.PropTypes.number,
  vertical: _react.PropTypes.bool
};

Marker.defaultProps = {
  max: 100,
  min: 0
};
module.exports = exports['default'];