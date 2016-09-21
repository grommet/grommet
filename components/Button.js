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

var CLASS_ROOT = _CSSClassnames2.default.BUTTON; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var Button = function (_Component) {
  (0, _inherits3.default)(Button, _Component);

  function Button() {
    (0, _classCallCheck3.default)(this, Button);
    return (0, _possibleConstructorReturn3.default)(this, (Button.__proto__ || (0, _getPrototypeOf2.default)(Button)).apply(this, arguments));
  }

  (0, _createClass3.default)(Button, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var plain = this.props.plain !== undefined ? this.props.plain : this.props.icon && !this.props.label;

      var icon = void 0;
      if (this.props.icon) {
        icon = _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + '__icon' },
          this.props.icon
        );
      }

      var hasIcon = icon !== undefined;
      var children = _react2.default.Children.map(this.props.children, function (child) {
        if (child && child.type && child.type.icon) {
          hasIcon = true;
          child = _react2.default.createElement(
            'span',
            { className: CLASS_ROOT + '__icon' },
            child
          );
        }
        return child;
      });

      var classes = (0, _classnames3.default)(CLASS_ROOT, this.props.className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--primary', this.props.primary), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--secondary', this.props.secondary), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--accent', this.props.accent), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--disabled', !this.props.onClick && !this.props.href), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--fill', this.props.fill), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--plain', plain), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--icon', this.props.icon || hasIcon), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--align-' + this.props.align, this.props.align), _classnames));

      if (!children) {
        children = this.props.label;
      }

      var Tag = this.props.href ? 'a' : 'button';
      var type = void 0;
      if (!this.props.href) {
        type = this.props.type;
      }
      return _react2.default.createElement(
        Tag,
        { href: this.props.href, id: this.props.id, type: type,
          className: classes, 'aria-label': this.props.a11yTitle,
          onClick: this.props.onClick,
          disabled: !this.props.onClick && !this.props.href },
        icon,
        children
      );
    }
  }]);
  return Button;
}(_react.Component);

Button.displayName = 'Button';
exports.default = Button;
;

Button.propTypes = {
  a11yTitle: _react.PropTypes.string,
  accent: _react.PropTypes.bool,
  align: _react.PropTypes.oneOf(['start', 'center', 'end']),
  fill: _react.PropTypes.bool,
  href: _react.PropTypes.string,
  icon: _react.PropTypes.element,
  id: _react.PropTypes.string,
  label: _react.PropTypes.node,
  onClick: _react.PropTypes.func,
  plain: _react.PropTypes.bool,
  primary: _react.PropTypes.bool,
  secondary: _react.PropTypes.bool,
  type: _react.PropTypes.oneOf(['button', 'reset', 'submit'])
};

Button.defaultProps = {
  type: 'button'
};
module.exports = exports['default'];