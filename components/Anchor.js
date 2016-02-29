'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _LinkNext = require('./icons/base/LinkNext');

var _LinkNext2 = _interopRequireDefault(_LinkNext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = 'anchor';

var Anchor = function (_Component) {
  _inherits(Anchor, _Component);

  function Anchor() {
    _classCallCheck(this, Anchor);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Anchor).apply(this, arguments));
  }

  _createClass(Anchor, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var icon = undefined;
      if (this.props.icon) {
        icon = this.props.icon;
      } else if (this.props.primary) {
        icon = _react2.default.createElement(_LinkNext2.default, null);
      }

      if (icon && !this.props.primary && !this.props.label) {
        icon = _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + '__icon' },
          icon
        );
      }

      var hasIcon = icon !== undefined;
      var children = _react.Children.map(this.props.children, function (child) {
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

      var classes = (0, _classnames3.default)(CLASS_ROOT, this.props.className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--disabled', this.props.disabled), _defineProperty(_classnames, CLASS_ROOT + '--icon', icon), _defineProperty(_classnames, CLASS_ROOT + '--icon-label', hasIcon && this.props.label), _defineProperty(_classnames, CLASS_ROOT + '--primary', this.props.primary), _defineProperty(_classnames, CLASS_ROOT + '--reverse', this.props.reverse), _classnames));

      if (!children) {
        children = this.props.label;
      }

      var first = this.props.reverse ? children : icon;
      var second = this.props.reverse ? icon : children;

      return _react2.default.createElement(
        this.props.tag,
        { id: this.props.id, className: classes,
          href: this.props.href,
          target: this.props.target,
          onClick: this.props.onClick,
          'aria-label': this.props.a11yTitle },
        first,
        second
      );
    }
  }]);

  return Anchor;
}(_react.Component);

exports.default = Anchor;
;

Anchor.propTypes = {
  a11yTitle: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  href: _react.PropTypes.string,
  icon: _react.PropTypes.element,
  id: _react.PropTypes.string,
  label: _react.PropTypes.node,
  onClick: _react.PropTypes.func,
  primary: _react.PropTypes.bool,
  tag: _react.PropTypes.string,
  target: _react.PropTypes.string,
  reverse: _react.PropTypes.bool
};

Anchor.defaultProps = {
  tag: 'a'
};
module.exports = exports['default'];