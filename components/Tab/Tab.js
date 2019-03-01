"use strict";

exports.__esModule = true;
exports.Tab = void 0;

var _react = _interopRequireWildcard(require("react"));

var _recompose = require("recompose");

var _styledComponents = require("styled-components");

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

var _Button = require("../Button");

var _Text = require("../Text");

var _hocs = require("../hocs");

var _utils = require("../../utils");

var _StyledTab = require("./StyledTab");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Tab =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(Tab, _Component);

  function Tab() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "onMouseOver", function (event) {
      var onMouseOver = _this.props.onMouseOver;

      _this.setState({
        over: true
      });

      if (onMouseOver) {
        onMouseOver(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseOut", function (event) {
      var onMouseOut = _this.props.onMouseOut;

      _this.setState({
        over: undefined
      });

      if (onMouseOut) {
        onMouseOut(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onClickTab", function (event) {
      var onActivate = _this.props.onActivate;

      if (event) {
        event.preventDefault();
      }

      onActivate();
    });

    return _this;
  }

  Tab.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    var active = nextProps.active;
    var over = prevState.over;

    if (active && over) {
      return {
        over: undefined
      };
    }

    return null;
  };

  var _proto = Tab.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        active = _this$props.active,
        forwardRef = _this$props.forwardRef,
        plain = _this$props.plain,
        title = _this$props.title,
        onMouseOver = _this$props.onMouseOver,
        onMouseOut = _this$props.onMouseOut,
        theme = _this$props.theme,
        rest = _objectWithoutPropertiesLoose(_this$props, ["active", "forwardRef", "plain", "title", "onMouseOver", "onMouseOut", "theme"]);

    var over = this.state.over;
    delete rest.onActivate;
    var normalizedTitle = title;
    var tabStyles = {};

    if (!plain) {
      if (typeof title !== 'string') {
        normalizedTitle = title;
      } else if (active) {
        normalizedTitle = _react.default.createElement(_Text.Text, theme.tab.active, title);
      } else {
        normalizedTitle = _react.default.createElement(_Text.Text, {
          color: over ? theme.tab.hover.color : theme.tab.color
        }, title);
      }

      if (theme.tab.border) {
        var borderColor = theme.tab.border.color || theme.global.control.border.color;

        if (active) {
          borderColor = theme.tab.border.active.color || borderColor;
        } else if (over) {
          borderColor = theme.tab.border.hover.color || borderColor;
        }

        borderColor = (0, _utils.normalizeColor)(borderColor, theme);
        tabStyles.border = {
          side: theme.tab.border.side,
          size: theme.tab.border.size,
          color: borderColor
        };
      }

      tabStyles.background = active ? theme.tab.active.background || theme.tab.background : theme.tab.background;
      tabStyles.pad = theme.tab.pad;
      tabStyles.margin = theme.tab.margin;
    }

    return _react.default.createElement(_Button.Button, _extends({
      ref: forwardRef,
      plain: true,
      role: "tab",
      "aria-selected": active,
      "aria-expanded": active
    }, rest, {
      onClick: this.onClickTab,
      onMouseOver: this.onMouseOver,
      onMouseOut: this.onMouseOut,
      onFocus: this.onMouseOver,
      onBlur: this.onMouseOut
    }), _react.default.createElement(_StyledTab.StyledTab, _extends({
      as: _Box.Box,
      plain: plain
    }, tabStyles), normalizedTitle));
  };

  return Tab;
}(_react.Component);

Tab.defaultProps = {};
Object.setPrototypeOf(Tab.defaultProps, _defaultProps.defaultProps);
var TabDoc;

if (process.env.NODE_ENV !== 'production') {
  TabDoc = require('./doc').doc(Tab); // eslint-disable-line global-require
}

var TabWrapper = (0, _recompose.compose)(_styledComponents.withTheme, _hocs.withForwardRef)(TabDoc || Tab);
exports.Tab = TabWrapper;