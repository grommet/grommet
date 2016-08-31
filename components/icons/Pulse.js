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

var _Add = require('./base/Add');

var _Add2 = _interopRequireDefault(_Add);

var _CSSClassnames = require('../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.PULSE;

var Pulse = function (_Component) {
  (0, _inherits3.default)(Pulse, _Component);

  function Pulse() {
    (0, _classCallCheck3.default)(this, Pulse);
    return (0, _possibleConstructorReturn3.default)(this, (Pulse.__proto__ || (0, _getPrototypeOf2.default)(Pulse)).apply(this, arguments));
  }

  (0, _createClass3.default)(Pulse, [{
    key: 'render',
    value: function render() {
      var classes = (0, _classnames2.default)(CLASS_ROOT, this.props.className);

      return _react2.default.createElement(
        'div',
        { className: classes },
        _react2.default.createElement(
          'div',
          { className: CLASS_ROOT + '__icon' },
          this.props.icon
        ),
        _react2.default.createElement('div', { className: CLASS_ROOT + '__icon-anim' })
      );
    }
  }]);
  return Pulse;
}(_react.Component);

Pulse.displayName = 'Pulse';
exports.default = Pulse;


Pulse.propTypes = {
  className: _react.PropTypes.string,
  icon: _react.PropTypes.node
};

Pulse.defaultProps = {
  icon: _react2.default.createElement(_Add2.default, null)
};
module.exports = exports['default'];