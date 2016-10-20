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
    _this.state = {
      mouseActive: false,
      focus: false
    };
    return _this;
  }

  (0, _createClass3.default)(Button, [{
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
      var _classnames,
          _this2 = this;

      var _props2 = this.props;
      var a11yTitle = _props2.a11yTitle;
      var accent = _props2.accent;
      var align = _props2.align;
      var children = _props2.children;
      var className = _props2.className;
      var fill = _props2.fill;
      var href = _props2.href;
      var icon = _props2.icon;
      var id = _props2.id;
      var label = _props2.label;
      var onClick = _props2.onClick;
      var _onBlur = _props2.onBlur;
      var _onFocus = _props2.onFocus;
      var _onMouseDown = _props2.onMouseDown;
      var _onMouseUp = _props2.onMouseUp;
      var path = _props2.path;
      var plain = _props2.plain;
      var primary = _props2.primary;
      var secondary = _props2.secondary;
      var type = _props2.type;
      var props = (0, _objectWithoutProperties3.default)(_props2, ['a11yTitle', 'accent', 'align', 'children', 'className', 'fill', 'href', 'icon', 'id', 'label', 'onClick', 'onBlur', 'onFocus', 'onMouseDown', 'onMouseUp', 'path', 'plain', 'primary', 'secondary', 'type']);

      delete props.method;
      var router = this.context.router;


      var buttonPlain = plain !== undefined ? plain : icon && !label;

      var buttonIcon = void 0;
      if (icon) buttonIcon = _react2.default.createElement(
        'span',
        { className: CLASS_ROOT + '__icon' },
        icon
      );

      var hasIcon = buttonIcon !== undefined;
      var buttonChildren = _react2.default.Children.map(children, function (child) {
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

      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--focus', this.state.focus), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--primary', primary), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--secondary', secondary), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--accent', accent), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--disabled', !onClick && !adjustedHref), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--fill', fill), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--plain', buttonPlain), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--icon', icon || hasIcon), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--align-' + align, align), _classnames), className);

      var adjustedOnClick = path && router ? this._onClick : onClick;

      if (!buttonChildren) {
        buttonChildren = label;
      }

      var Tag = adjustedHref ? 'a' : 'button';
      var buttonType = void 0;
      if (!adjustedHref) {
        buttonType = type;
      }

      return _react2.default.createElement(
        Tag,
        (0, _extends3.default)({}, props, { href: adjustedHref, id: id, type: buttonType,
          className: classes, 'aria-label': a11yTitle,
          onClick: adjustedOnClick,
          disabled: !onClick && !adjustedHref,
          onMouseDown: function onMouseDown(event) {
            _this2.setState({ mouseActive: true });
            if (_onMouseDown) {
              _onMouseDown(event);
            }
          },
          onMouseUp: function onMouseUp(event) {
            _this2.setState({ mouseActive: false });
            if (_onMouseUp) {
              _onMouseUp(event);
            }
          },
          onFocus: function onFocus(event) {
            if (_this2.state.mouseActive === false) {
              _this2.setState({ focus: true });
            }
            if (_onFocus) {
              _onFocus(event);
            }
          },
          onBlur: function onBlur(event) {
            _this2.setState({ focus: false });
            if (_onBlur) {
              _onBlur(event);
            }
          } }),
        buttonIcon,
        buttonChildren
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
  method: _react.PropTypes.oneOf(['push', 'replace']),
  onClick: _react.PropTypes.func,
  path: _react.PropTypes.string,
  plain: _react.PropTypes.bool,
  primary: _react.PropTypes.bool,
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