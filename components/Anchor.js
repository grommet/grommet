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
    return (0, _possibleConstructorReturn3.default)(this, (Anchor.__proto__ || (0, _getPrototypeOf2.default)(Anchor)).apply(this, arguments));
  }

  (0, _createClass3.default)(Anchor, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props;
      var a11yTitle = _props.a11yTitle;
      var animateIcon = _props.animateIcon;
      var children = _props.children;
      var className = _props.className;
      var disabled = _props.disabled;
      var icon = _props.icon;
      var id = _props.id;
      var label = _props.label;
      var primary = _props.primary;
      var reverse = _props.reverse;
      var tag = _props.tag;
      var props = (0, _objectWithoutProperties3.default)(_props, ['a11yTitle', 'animateIcon', 'children', 'className', 'disabled', 'icon', 'id', 'label', 'primary', 'reverse', 'tag']);


      var anchorIcon = void 0;
      if (icon) {
        anchorIcon = icon;
      } else if (primary) {
        anchorIcon = _react2.default.createElement(_LinkNext2.default, {
          a11yTitle: id ? id + '-icon' : 'link next' });
      }

      if (anchorIcon && !primary && !label) {
        anchorIcon = _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + '__icon' },
          anchorIcon
        );
      }

      var hasIcon = anchorIcon !== undefined;
      var anchorChildren = _react.Children.map(children, function (child) {
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

      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--animate-icon', hasIcon && animateIcon !== false), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--disabled', disabled), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--icon', anchorIcon || hasIcon), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--icon-label', hasIcon && label), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--primary', primary), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--reverse', reverse), _classnames), className);

      if (!anchorChildren) {
        anchorChildren = label;
      }

      var first = reverse ? anchorChildren : anchorIcon;
      var second = reverse ? anchorIcon : anchorChildren;

      var Component = tag;
      return _react2.default.createElement(
        Component,
        (0, _extends3.default)({}, props, { className: classes, 'aria-label': a11yTitle }),
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
  reverse: _react.PropTypes.bool,
  tag: _react.PropTypes.string,
  target: _react.PropTypes.string
};

Anchor.defaultProps = {
  tag: 'a'
};
module.exports = exports['default'];