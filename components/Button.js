'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = 'button';

var Button = function (_Component) {
  _inherits(Button, _Component);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Button).apply(this, arguments));
  }

  _createClass(Button, [{
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

      var classes = (0, _classnames3.default)(CLASS_ROOT, this.props.className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--primary', this.props.primary), _defineProperty(_classnames, CLASS_ROOT + '--secondary', this.props.secondary), _defineProperty(_classnames, CLASS_ROOT + '--accent', this.props.accent), _defineProperty(_classnames, CLASS_ROOT + '--disabled', !this.props.onClick && !this.props.href), _defineProperty(_classnames, CLASS_ROOT + '--fill', this.props.fill), _defineProperty(_classnames, CLASS_ROOT + '--plain', plain), _defineProperty(_classnames, CLASS_ROOT + '--icon', this.props.icon || hasIcon), _defineProperty(_classnames, CLASS_ROOT + '--align-' + this.props.align, this.props.align), _classnames));

      if (!children) {
        children = this.props.label;
      }

      var Tag = this.props.href ? 'a' : 'button';

      return _react2.default.createElement(
        Tag,
        { href: this.props.href, id: this.props.id, type: this.props.type,
          className: classes, 'aria-label': this.props.a11yTitle,
          onClick: this.props.onClick, disabled: !this.props.onClick },
        icon,
        children
      );
    }
  }]);

  return Button;
}(_react.Component);

exports.default = Button;
;

Button.propTypes = {
  a11yTitle: _react.PropTypes.string,
  accent: _react.PropTypes.bool,
  align: _react.PropTypes.oneOf(['start', 'center', 'end']),
  fill: _react.PropTypes.bool,
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