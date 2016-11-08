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

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CLASS_ROOT = _CSSClassnames2.default.HEADING; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var Heading = function (_Component) {
  (0, _inherits3.default)(Heading, _Component);

  function Heading() {
    (0, _classCallCheck3.default)(this, Heading);
    return (0, _possibleConstructorReturn3.default)(this, (Heading.__proto__ || (0, _getPrototypeOf2.default)(Heading)).apply(this, arguments));
  }

  (0, _createClass3.default)(Heading, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props,
          align = _props.align,
          children = _props.children,
          className = _props.className,
          margin = _props.margin,
          size = _props.size,
          strong = _props.strong,
          Tag = _props.tag,
          uppercase = _props.uppercase,
          props = (0, _objectWithoutProperties3.default)(_props, ['align', 'children', 'className', 'margin', 'size', 'strong', 'tag', 'uppercase']);

      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--' + size, size), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--strong', strong), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--align-' + align, align), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--margin-' + margin, margin), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--uppercase', uppercase), _classnames), className);

      return _react2.default.createElement(
        Tag,
        (0, _extends3.default)({}, props, { className: classes }),
        children
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