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

// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.HEADING;

var Heading = function (_Component) {
  (0, _inherits3.default)(Heading, _Component);

  function Heading() {
    (0, _classCallCheck3.default)(this, Heading);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Heading).apply(this, arguments));
  }

  (0, _createClass3.default)(Heading, [{
    key: 'render',
    value: function render() {
      var classes = [CLASS_ROOT];
      if (this.props.size) {
        classes.push(CLASS_ROOT + '--' + this.props.size);
      }
      if (this.props.strong) {
        classes.push(CLASS_ROOT + '--strong');
      }
      if (this.props.align) {
        classes.push(CLASS_ROOT + '--align-' + this.props.align);
      }
      if (this.props.margin) {
        classes.push(CLASS_ROOT + '--margin-' + this.props.margin);
      }
      if (this.props.uppercase) {
        classes.push(CLASS_ROOT + '--uppercase');
      }
      if (this.props.className) {
        classes.push(this.props.className);
      }

      // we handle dangerouslySetInnerHTML to allow using Heading with Markdown.
      return _react2.default.createElement(
        this.props.tag,
        { id: this.props.id, className: classes.join(' '),
          dangerouslySetInnerHTML: this.props.dangerouslySetInnerHTML },
        this.props.children
      );
    }
  }]);
  return Heading;
}(_react.Component);

Heading.displayName = 'Heading';
exports.default = Heading;


Heading.propTypes = {
  align: _react.PropTypes.oneOf(['start', 'center', 'end']),
  margin: _react.PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  size: _react.PropTypes.oneOf(['small', 'medium', 'large']),
  strong: _react.PropTypes.bool,
  tag: _react.PropTypes.string,
  uppercase: _react.PropTypes.bool
};

Heading.defaultProps = {
  tag: 'h1'
};
module.exports = exports['default'];