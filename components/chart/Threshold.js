'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.CHART_THRESHOLD; // (C) Copyright 2016 Hewlett Packard Enterprise Development LP

var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;

var DOUBLE_PADDING = 2 * _utils.padding;

var Threshold = function (_Component) {
  (0, _inherits3.default)(Threshold, _Component);

  function Threshold(props) {
    (0, _classCallCheck3.default)(this, Threshold);

    var _this = (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Threshold).call(this, props));

    _this.state = {
      size: { width: 0, height: 0 },
      graphHeight: 0,
      graphWidth: 0
    };
    _this._size = new _utils.trackSize(props, _this._onSize.bind(_this));
    return _this;
  }

  (0, _createClass3.default)(Threshold, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._size.start(this.refs.svg);
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
      var _props = this.props;
      var value = _props.value;
      var max = _props.max;
      var min = _props.min;
      var vertical = _props.vertical;
      var reverse = _props.reverse;
      var colorIndex = _props.colorIndex;
      var _state = this.state;
      var _state$size = _state.size;
      var height = _state$size.height;
      var width = _state$size.width;
      var graphWidth = _state.graphWidth;
      var graphHeight = _state.graphHeight;

      var classes = [CLASS_ROOT];
      if (colorIndex) {
        classes.push(COLOR_INDEX + '-' + colorIndex);
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }
      var commands = '';

      if (vertical) {
        var x = (0, _utils.graphValue)(value, min, max, graphWidth);
        if (reverse) {
          x = graphWidth - x;
        }
        commands = 'M' + (x + _utils.padding) + ',0 L' + (x + _utils.padding) + ',' + height;
      } else {
        var y = (0, _utils.graphValue)(value, min, max, graphHeight);
        if (!reverse) {
          y = graphHeight - y;
        }
        commands = 'M0,' + (y + _utils.padding) + ' L' + width + ',' + (y + _utils.padding);
      }

      return _react2.default.createElement(
        'svg',
        { ref: 'svg', className: classes.join(' '),
          viewBox: '0 0 ' + width + ' ' + height,
          preserveAspectRatio: 'none' },
        _react2.default.createElement('path', { fill: 'none', d: commands })
      );
    }
  }]);
  return Threshold;
}(_react.Component);

Threshold.displayName = 'Threshold';
exports.default = Threshold;
;

Threshold.propTypes = {
  colorIndex: _react.PropTypes.string,
  max: _react.PropTypes.number.isRequired,
  min: _react.PropTypes.number,
  reverse: _react.PropTypes.bool,
  value: _react.PropTypes.number.isRequired,
  vertical: _react.PropTypes.bool
};

Threshold.defaultProps = {
  min: 0,
  max: 100
};
module.exports = exports['default'];