"use strict";

exports.__esModule = true;
exports.Tab = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = require("styled-components");
var _defaultProps = require("../../default-props");
var _Button = require("../Button");
var _Text = require("../Text");
var _TabsContext = require("../Tabs/TabsContext");
var _utils = require("../../utils");
var _StyledTab = require("./StyledTab");
var _propTypes = require("./propTypes");
var _useIsomorphicLayoutEffect = require("../../utils/use-isomorphic-layout-effect");
var _excluded = ["active", "disabled", "children", "icon", "plain", "title", "onBlur", "onFocus", "onMouseOver", "onMouseOut", "reverse", "onClick"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var Tab = exports.Tab = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var activeProp = _ref.active,
    disabled = _ref.disabled,
    children = _ref.children,
    icon = _ref.icon,
    plain = _ref.plain,
    title = _ref.title,
    _onBlur = _ref.onBlur,
    _onFocus = _ref.onFocus,
    onMouseOver = _ref.onMouseOver,
    onMouseOut = _ref.onMouseOut,
    reverse = _ref.reverse,
    onClick = _ref.onClick,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useContext = (0, _react.useContext)(_TabsContext.TabsContext),
    active = _useContext.active,
    activeIndex = _useContext.activeIndex,
    index = _useContext.index,
    tabsContextRef = _useContext.ref,
    onActivate = _useContext.onActivate,
    setActiveContent = _useContext.setActiveContent,
    setActiveTitle = _useContext.setActiveTitle,
    setFocusIndex = _useContext.setFocusIndex;
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;
  var _useState = (0, _react.useState)(undefined),
    over = _useState[0],
    setOver = _useState[1];
  var normalizedTitle = title;
  var tabStyles = {};
  var tabRef = (0, _utils.useForwardedRef)(ref);
  (0, _useIsomorphicLayoutEffect.useLayoutEffect)(function () {
    if (tabRef.current && tabsContextRef) {
      tabsContextRef.current = tabRef.current;
    }
  });
  (0, _react.useEffect)(function () {
    if (active) {
      setActiveContent(children);
      var activeTitle = typeof title === 'string' ? title : activeIndex + 1;
      setActiveTitle(activeTitle);
    }
  }, [active, activeIndex, children, setActiveContent, setActiveTitle, title]);
  var onMouseOverTab = function onMouseOverTab(event) {
    setOver(true);
    if (onMouseOver) {
      onMouseOver(event);
    }
  };
  var onMouseOutTab = function onMouseOutTab(event) {
    setOver(undefined);
    if (onMouseOut) {
      onMouseOut(event);
    }
  };
  if (!plain) {
    if (typeof title !== 'string') {
      normalizedTitle = title;
    } else if (active) {
      normalizedTitle = /*#__PURE__*/_react["default"].createElement(_Text.Text, theme.tab.active, title);
    } else if (disabled && theme.tab.disabled) {
      normalizedTitle = /*#__PURE__*/_react["default"].createElement(_Text.Text, theme.tab.disabled, title);
    } else {
      normalizedTitle = /*#__PURE__*/_react["default"].createElement(_Text.Text, {
        color: over ? theme.tab.hover.color : theme.tab.color
      }, title);
    }
  }
  var onClickTab = function onClickTab(event) {
    if (event) {
      event.preventDefault();
    }
    onActivate();
    if (onClick) {
      onClick(event);
    }
  };
  if (active && disabled) {
    console.warn( // eslint-disable-next-line max-len
    "Warning: Tab props 'active' and 'disabled' have both been set to TRUE on the same Tab resulting in an interesting Tab state. Is this your intent?");
  }
  if (!plain) {
    if (typeof title !== 'string') {
      normalizedTitle = title;
    } else if (active) {
      normalizedTitle = /*#__PURE__*/_react["default"].createElement(_Text.Text, theme.tab.active, title);
    } else if (disabled && theme.tab.disabled) {
      normalizedTitle = /*#__PURE__*/_react["default"].createElement(_Text.Text, theme.tab.disabled, title);
    } else {
      normalizedTitle = /*#__PURE__*/_react["default"].createElement(_Text.Text, {
        color: over ? theme.tab.hover.color : theme.tab.color
      }, title);
    }
    if (theme.tab.border) {
      var borderColor = theme.tab.border.color || theme.global.control.border.color;
      if (active) {
        borderColor = theme.tab.border.active.color || borderColor;
      } else if (disabled && theme.tab.border.disabled) {
        borderColor = theme.tab.border.disabled.color || borderColor;
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

  // needed to apply hover/active styles to the icon
  var renderIcon = function renderIcon(iconProp) {
    if (active) {
      return /*#__PURE__*/_react["default"].cloneElement(iconProp, _extends({}, theme.tab.active));
    }
    if (disabled) {
      return /*#__PURE__*/_react["default"].cloneElement(iconProp, _extends({}, theme.tab.disabled));
    }
    return /*#__PURE__*/_react["default"].cloneElement(iconProp, {
      color: over ? theme.tab.hover.color : theme.tab.color
    });
  };
  var normalizedIcon;
  if (icon) {
    normalizedIcon = renderIcon(icon);
  }
  var first = reverse ? normalizedTitle : normalizedIcon;
  var second = reverse ? normalizedIcon : normalizedTitle;
  var withIconStyles;
  if (first && second) {
    withIconStyles = {
      direction: 'row',
      align: 'center',
      justify: 'center',
      gap: 'small'
    };
  }
  return /*#__PURE__*/_react["default"].createElement(_Button.Button, _extends({
    ref: tabRef,
    plain: true,
    role: "tab",
    "aria-selected": active,
    "aria-expanded": active,
    disabled: disabled
  }, rest, {
    onClick: onClickTab,
    onMouseOver: onMouseOverTab,
    onMouseOut: onMouseOutTab,
    onFocus: function onFocus() {
      if (_onFocus) _onFocus();
      setFocusIndex(index);
    },
    onBlur: function onBlur() {
      if (_onBlur) _onBlur();
      setFocusIndex(-1);
    }
  }), /*#__PURE__*/_react["default"].createElement(_StyledTab.StyledTab, _extends({
    disabled: disabled,
    plain: plain
  }, withIconStyles, tabStyles), first, second));
});
Tab.displayName = 'Tab';
Tab.defaultProps = {};
Object.setPrototypeOf(Tab.defaultProps, _defaultProps.defaultProps);
Tab.propTypes = _propTypes.TabPropTypes;