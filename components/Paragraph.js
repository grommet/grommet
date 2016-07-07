'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.PARAGRAPH; // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var Paragraph = function (_Component) {
  (0, _inherits3.default)(Paragraph, _Component);

  function Paragraph() {
    (0, _classCallCheck3.default)(this, Paragraph);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Paragraph).apply(this, arguments));
  }

  (0, _createClass3.default)(Paragraph, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var classes = (0, _classnames3.default)(CLASS_ROOT, this.props.className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + this.props.size, this.props.size), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--align-' + this.props.align, this.props.align), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--margin-' + this.props.margin, this.props.margin), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--width-' + this.props.width, this.props.width), _classnames));

      // we handle dangerouslySetInnerHTML to allow using Paragraph with Markdown.
      return _react2.default.createElement(
        'p',
        { id: this.props.id, className: classes,
          dangerouslySetInnerHTML: this.props.dangerouslySetInnerHTML },
        this.props.children
      );
    }
  }]);
  return Paragraph;
}(_react.Component);

Paragraph.displayName = 'Paragraph';
exports.default = Paragraph;
;

Paragraph.propTypes = {
  align: _react.PropTypes.oneOf(['start', 'center', 'end']),
  id: _react.PropTypes.string,
  margin: _react.PropTypes.oneOf(['none', 'small', 'medium', 'large']),
  size: _react.PropTypes.oneOf(['small', 'medium', 'large', 'xlarge']),
  width: _react.PropTypes.oneOf(['small', 'medium', 'large'])
};
module.exports = exports['default'];