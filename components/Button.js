'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; // (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _CSSClassnames = require('../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Box = require('./Box');

var _Box2 = _interopRequireDefault(_Box);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CLASS_ROOT = _CSSClassnames2.default.BUTTON;

function getHoverModifier(hoverIndicator) {
  if (hoverIndicator) {
    if ((typeof hoverIndicator === 'undefined' ? 'undefined' : _typeof(hoverIndicator)) === 'object') {
      if (hoverIndicator.background) {
        if (typeof hoverIndicator.background === 'string') {
          var prefix = _CSSClassnames.namespace + 'background-hover-color-index-';
          return '' + prefix + hoverIndicator.background;
        }
        return CLASS_ROOT + '--hover-background';
      }
    } else if (typeof hoverIndicator === 'string') {
      return CLASS_ROOT + '--hover-' + hoverIndicator;
    }
  }
}

var Button = function (_Component) {
  _inherits(Button, _Component);

  function Button() {
    _classCallCheck(this, Button);

    var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this));

    _this._onClick = _this._onClick.bind(_this);
    _this._onMouseDown = _this._onMouseDown.bind(_this);
    _this._onMouseUp = _this._onMouseUp.bind(_this);
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

      var modifierKey = event.ctrlKey || event.metaKey;

      if (modifierKey && !onClick) {
        return true;
      }

      event.preventDefault();

      if ('push' === method) {
        (router.history || router).push(path);
      } else if ('replace' === method) {
        (router.history || router).replace(path);
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
          box = _props2.box,
          children = _props2.children,
          className = _props2.className,
          critical = _props2.critical,
          fill = _props2.fill,
          hoverIndicator = _props2.hoverIndicator,
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
          props = _objectWithoutProperties(_props2, ['a11yTitle', 'accent', 'align', 'box', 'children', 'className', 'critical', 'fill', 'hoverIndicator', 'href', 'icon', 'label', 'onClick', 'path', 'plain', 'primary', 'reverse', 'secondary', 'type']);

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

      var adjustedHref = void 0;
      if (router && router.createPath) {
        adjustedHref = path && router ? router.createPath(path) : href;
      } else {
        adjustedHref = path && router && router.history ? router.history.createHref({ pathname: path }) : href;
      }

      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--box', box), _defineProperty(_classnames, CLASS_ROOT + '--critical', critical), _defineProperty(_classnames, CLASS_ROOT + '--focus', this.state.focus), _defineProperty(_classnames, CLASS_ROOT + '--primary', primary), _defineProperty(_classnames, CLASS_ROOT + '--secondary', secondary), _defineProperty(_classnames, CLASS_ROOT + '--accent', accent), _defineProperty(_classnames, CLASS_ROOT + '--disabled', !onClick && !adjustedHref && ['reset', 'submit'].indexOf(type) === -1), _defineProperty(_classnames, CLASS_ROOT + '--fill', fill), _defineProperty(_classnames, CLASS_ROOT + '--plain', plain || box || _react.Children.count(children) > 0 || icon && !label), _defineProperty(_classnames, CLASS_ROOT + '--align-' + align, align), _defineProperty(_classnames, getHoverModifier(hoverIndicator), hoverIndicator), _classnames), className);

      var adjustedOnClick = path && router ? this._onClick : onClick;

      var Tag = adjustedHref ? 'a' : 'button';
      var buttonType = void 0;
      if (!adjustedHref) {
        buttonType = type;
      }

      var boxProps = void 0;
      if (box) {
        // Let the root element of the Button be a Box element with tag prop
        boxProps = {
          tag: Tag
        };
        Tag = _Box2.default;
      }

      var first = reverse ? buttonLabel : buttonIcon;
      var second = reverse ? buttonIcon : buttonLabel;

      return _react2.default.createElement(
        Tag,
        _extends({}, props, boxProps, { href: adjustedHref, type: buttonType,
          className: classes, 'aria-label': a11yTitle,
          onClick: adjustedOnClick,
          disabled: !onClick && !adjustedHref && ['reset', 'submit'].indexOf(type) === -1,
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


Button.propTypes = {
  a11yTitle: _propTypes2.default.string,
  accent: _propTypes2.default.bool,
  align: _propTypes2.default.oneOf(['start', 'center', 'end']),
  box: _propTypes2.default.bool,
  critical: _propTypes2.default.bool,
  fill: _propTypes2.default.bool,
  hoverIndicator: _propTypes2.default.oneOfType([_propTypes2.default.oneOf(['background']), _propTypes2.default.shape({
    background: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string])
  })]),
  href: _propTypes2.default.string,
  icon: _propTypes2.default.element,
  label: _propTypes2.default.node,
  method: _propTypes2.default.oneOf(['push', 'replace']),
  onClick: _propTypes2.default.func,
  path: _propTypes2.default.string,
  plain: _propTypes2.default.bool,
  primary: _propTypes2.default.bool,
  reverse: _propTypes2.default.bool,
  secondary: _propTypes2.default.bool,
  type: _propTypes2.default.oneOf(['button', 'reset', 'submit'])
};

Button.defaultProps = {
  method: 'push',
  type: 'button'
};

Button.contextTypes = {
  router: _propTypes2.default.object
};
module.exports = exports['default'];