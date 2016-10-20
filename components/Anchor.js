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

    var _this = (0, _possibleConstructorReturn3.default)(this, (Anchor.__proto__ || (0, _getPrototypeOf2.default)(Anchor)).call(this));

    _this._onClick = _this._onClick.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Anchor, [{
    key: '_onClick',
    value: function _onClick(event) {
      var _props = this.props;
      var method = _props.method;
      var onClick = _props.onClick;
      var path = _props.path;
      var router = this.context.router;


      event.preventDefault();

      if ('push' === method) {
        router.push(path);
      } else if ('replace' === method) {
        router.replace(path);
      }

      if (onClick) {
        onClick();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var _props2 = this.props;
      var a11yTitle = _props2.a11yTitle;
      var animateIcon = _props2.animateIcon;
      var children = _props2.children;
      var className = _props2.className;
      var disabled = _props2.disabled;
      var href = _props2.href;
      var icon = _props2.icon;
      var id = _props2.id;
      var label = _props2.label;
      var onClick = _props2.onClick;
      var path = _props2.path;
      var primary = _props2.primary;
      var reverse = _props2.reverse;
      var tag = _props2.tag;
      var props = (0, _objectWithoutProperties3.default)(_props2, ['a11yTitle', 'animateIcon', 'children', 'className', 'disabled', 'href', 'icon', 'id', 'label', 'onClick', 'path', 'primary', 'reverse', 'tag']);

      delete props.method;
      var router = this.context.router;


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

      var adjustedHref = path && router ? router.createPath(path) : href;

      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--animate-icon', hasIcon && animateIcon !== false), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--disabled', disabled), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--icon', anchorIcon || hasIcon), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--icon-label', hasIcon && label), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--primary', primary), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--reverse', reverse), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--active', router && path && router.isActive(path)), _classnames), className);

      var adjustedOnClick = path && router ? this._onClick : onClick;

      if (!anchorChildren) {
        anchorChildren = label;
      }

      var first = reverse ? anchorChildren : anchorIcon;
      var second = reverse ? anchorIcon : anchorChildren;

      var Component = tag;
      return _react2.default.createElement(
        Component,
        (0, _extends3.default)({}, props, { href: adjustedHref, className: classes,
          'aria-label': a11yTitle, onClick: adjustedOnClick }),
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
  method: _react.PropTypes.oneOf(['push', 'replace']),
  onClick: _react.PropTypes.func,
  path: _react.PropTypes.string,
  primary: _react.PropTypes.bool,
  reverse: _react.PropTypes.bool,
  tag: _react.PropTypes.string,
  target: _react.PropTypes.string
};

Anchor.defaultProps = {
  method: 'push',
  tag: 'a'
};

Anchor.contextTypes = {
  router: _react.PropTypes.object
};
module.exports = exports['default'];