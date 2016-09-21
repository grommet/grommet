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

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.ATTRIBUTE;

var Attribute = function (_Component) {
  (0, _inherits3.default)(Attribute, _Component);

  function Attribute() {
    (0, _classCallCheck3.default)(this, Attribute);
    return (0, _possibleConstructorReturn3.default)(this, (Attribute.__proto__ || (0, _getPrototypeOf2.default)(Attribute)).apply(this, arguments));
  }

  (0, _createClass3.default)(Attribute, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: CLASS_ROOT },
        _react2.default.createElement(
          'label',
          { className: CLASS_ROOT + '__label' },
          this.props.label
        ),
        _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + '__contents' },
          this.props.children
        )
      );
    }
  }]);
  return Attribute;
}(_react.Component);

Attribute.displayName = 'Attribute';
exports.default = Attribute;
;

Attribute.propTypes = { // remove in 1.0
  label: _react.PropTypes.string
};
module.exports = exports['default'];