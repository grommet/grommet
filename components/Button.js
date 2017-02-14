'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.BUTTON;

var Button = function (_Component) {
  _inherits(Button, _Component);

  function Button() {
    _classCallCheck(this, Button);

    var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this));

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

  _createClass(Button, [{
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
        onClick.apply(undefined, arguments);
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
          props = _objectWithoutProperties(_props2, ['a11yTitle', 'accent', 'align', 'children', 'className', 'fill', 'href', 'icon', 'label', 'onClick', 'path', 'plain', 'primary', 'reverse', 'secondary', 'type']);

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

      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--focus', this.state.focus), _defineProperty(_classnames, CLASS_ROOT + '--primary', primary), _defineProperty(_classnames, CLASS_ROOT + '--secondary', secondary), _defineProperty(_classnames, CLASS_ROOT + '--accent', accent), _defineProperty(_classnames, CLASS_ROOT + '--disabled', !onClick && !adjustedHref), _defineProperty(_classnames, CLASS_ROOT + '--fill', fill), _defineProperty(_classnames, CLASS_ROOT + '--plain', plain || _react.Children.count(children) > 0 || icon && !label), _defineProperty(_classnames, CLASS_ROOT + '--align-' + align, align), _classnames), className);

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
        _extends({}, props, { href: adjustedHref, type: buttonType,
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