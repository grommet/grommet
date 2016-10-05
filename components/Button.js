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

    _this.state = {
      mouseActive: false,
      focus: false
    };
    return _this;
  }

  (0, _createClass3.default)(Button, [{
    key: 'render',
    value: function render() {
      var _classnames,
          _this2 = this;

      var _props = this.props;
      var a11yTitle = _props.a11yTitle;
      var accent = _props.accent;
      var align = _props.align;
      var children = _props.children;
      var className = _props.className;
      var fill = _props.fill;
      var href = _props.href;
      var icon = _props.icon;
      var id = _props.id;
      var label = _props.label;
      var onClick = _props.onClick;
      var _onBlur = _props.onBlur;
      var _onFocus = _props.onFocus;
      var _onMouseDown = _props.onMouseDown;
      var _onMouseUp = _props.onMouseUp;
      var plain = _props.plain;
      var primary = _props.primary;
      var secondary = _props.secondary;
      var type = _props.type;
      var props = (0, _objectWithoutProperties3.default)(_props, ['a11yTitle', 'accent', 'align', 'children', 'className', 'fill', 'href', 'icon', 'id', 'label', 'onClick', 'onBlur', 'onFocus', 'onMouseDown', 'onMouseUp', 'plain', 'primary', 'secondary', 'type']);


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

      var classes = (0, _classnames3.default)(CLASS_ROOT, (_classnames = {}, (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--focus', this.state.focus), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--primary', primary), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--secondary', secondary), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--accent', accent), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--disabled', !onClick && !href), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--fill', fill), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--plain', buttonPlain), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--icon', icon || hasIcon), (0, _defineProperty3.default)(_classnames, CLASS_ROOT + '--align-' + align, align), _classnames), className);

      if (!buttonChildren) {
        buttonChildren = label;
      }

      var Tag = href ? 'a' : 'button';
      var buttonType = void 0;
      if (!href) {
        buttonType = type;
      }

      return _react2.default.createElement(
        Tag,
        (0, _extends3.default)({}, props, { href: href, id: id, type: buttonType,
          className: classes, 'aria-label': a11yTitle,
          onClick: onClick,
          disabled: !onClick && !href,
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