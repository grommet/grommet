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

var CLASS_ROOT = _CSSClassnames2.default.BUTTON; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var Button = function (_Component) {
  (0, _inherits3.default)(Button, _Component);

  function Button() {
    (0, _classCallCheck3.default)(this, Button);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Button.__proto__ || (0, _getPrototypeOf2.default)(Button)).call(this));

    _this._onClick = _this._onClick.bind(_this);
    _this._onMouseDown = _this._onMouseDown.bind(_this);
    _this._onMouseUp = _this._onMouseDown.bind(_this);
    _this._onFocus = _this._onFocus.bind(_this);
    _this._onBlur = _this._onBlur.bind(_this);
    _this.state = {
      mouseActive: false,
      focus: false
    };
    return _this;
  }

  (0, _createClass3.default)(Button, [{
    key: '_onClick',
    value: function _onClick(event) {
      var _props = this.props,
          method = _props.method,
          onClick = _props.onClick,
          path = _props.path;
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
    key: '_onMouseDown',
    value: function _onMouseDown(event) {
      var onMouseDown = this.props.onMouseDown;

      this.setState({ mouseActive: true });
      if (onMouseDown) {
        onMouseDown(event);
      }
    }
  }, {
    key: '_onMouseUp',
    value: function _onMouseUp(event) {
      var onMouseUp = this.props.onMouseUp;

      this.setState({ mouseActive: false });
      if (onMouseUp) {
        onMouseUp(event);
      }
    }
  }, {
    key: '_onFocus',
    value: function _onFocus(event) {
      var onFocus = this.props.onFocus;
      var mouseActive = this.state.mouseActive;

      if (mouseActive === false) {
        this.setState({ focus: true });
      }
      if (onFocus) {
        onFocus(event);
      }
    }
  }, {
    key: '_onBlur',
    value: function _onBlur(event) {
      var onBlur = this.props.onBlur;

      this.setState({ focus: false });
      if (onBlur) {
        onBlur(event);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var _props2 = this.props,
          a11yTitle = _props2.a11yTitle,
          accent = _props2.accent,
          align = _props2.align,
          children = _props2.children,
          className = _props2.className,
          fill = _props2.fill,
          href = _props2.href,
          icon = _props2.icon,
          label = _props2.label,
          onClick = _props2.onClick,
          path = _props2.path,
          plain = _props2.plain,
          primary = _props2.primary,
          reverse = _props2.reverse,
          secondary = _props2.secondary,
          type = _props2.type,
          props = (0, _objectWithoutProperties3.default)(_props2, ['a11yTitle', 'accent', 'align', 'children', 'className', 'fill', 'href', 'icon', 'label', 'onClick', 'path', 'plain', 'primary', 'reverse', 'secondary', 'type']);

      delete props.method;
      var router = this.context.router;


      var buttonIcon = void 0;
      if (icon) {
        buttonIcon = _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + '__icon' },
          icon
        );
      }

      var buttonLabel = void 0;
      if (label) {
        buttonLabel = _react2.default.createElement(
          'span',
          { className: CLASS_ROOT + '__label' },
          label
        );
      }

      var adjustedHref = path && router ? router.createPath(path) : href;

      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--focus', this.state.focus), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--primary', primary), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--secondary', secondary), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--accent', accent), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--disabled', !onClick && !adjustedHref), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--fill', fill), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--plain', plain || _react.Children.count(children) > 0 || icon && !label), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--align-' + align, align), _classnames), className);

      var adjustedOnClick = path && router ? this._onClick : onClick;

      var Tag = adjustedHref ? 'a' : 'button';
      var buttonType = void 0;
      if (!adjustedHref) {
        buttonType = type;
      }

      var first = reverse ? buttonLabel : buttonIcon;
      var second = reverse ? buttonIcon : buttonLabel;

      return _react2.default.createElement(
        Tag,
        (0, _extends3.default)({}, props, { href: adjustedHref, type: buttonType,
          className: classes, 'aria-label': a11yTitle,
          onClick: adjustedOnClick,
          disabled: !onClick && !adjustedHref,
          onMouseDown: this._onMouseDown, onMouseUp: this._onMouseUp,
          onFocus: this._onFocus, onBlur: this._onBlur }),
        first,
        second,
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
  label: _react.PropTypes.node,
  method: _react.PropTypes.oneOf(['push', 'replace']),
  onClick: _react.PropTypes.func,
  path: _react.PropTypes.string,
  plain: _react.PropTypes.bool,
  primary: _react.PropTypes.bool,
  reverse: _react.PropTypes.bool,
  secondary: _react.PropTypes.bool,
  type: _react.PropTypes.oneOf(['button', 'reset', 'submit'])
};

Button.defaultProps = {
  method: 'push',
  type: 'button'
};

Button.contextTypes = {
  router: _react.PropTypes.object
};
module.exports = exports['default'];