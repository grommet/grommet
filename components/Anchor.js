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

var _LinkNext = require('./icons/base/LinkNext');

var _LinkNext2 = _interopRequireDefault(_LinkNext);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.ANCHOR;

var Anchor = function (_Component) {
  (0, _inherits3.default)(Anchor, _Component);

  function Anchor() {
    (0, _classCallCheck3.default)(this, Anchor);
    return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Anchor).apply(this, arguments));
  }

  (0, _createClass3.default)(Anchor, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var icon = void 0;
      if (this.props.icon) {
        icon = this.props.icon;
      } else if (this.props.primary) {
        icon = _react2.default.createElement(_LinkNext2.default, { a11yTitle: this.props.id + 'anchor-next-title',
          a11yTitleId: this.props.id + 'anchor-next-title-id' });
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

      var classes = (0, _classnames3.default)(CLASS_ROOT, this.props.className, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--animate-icon', hasIcon && this.props.animateIcon !== false), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--disabled', this.props.disabled), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--icon', icon || hasIcon), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--icon-label', hasIcon && this.props.label), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--primary', this.props.primary), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--reverse', this.props.reverse), _classnames));

      if (!children) {
        children = this.props.label;
      }

      var first = this.props.reverse ? children : icon;
      var second = this.props.reverse ? icon : children;

      var Component = this.props.tag;
      return _react2.default.createElement(
        Component,
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

Anchor.displayName = 'Anchor';
exports.default = Anchor;
;

Anchor.propTypes = {
  a11yTitle: _react.PropTypes.string,
  animateIcon: _react.PropTypes.bool,
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