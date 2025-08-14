"use strict";

exports.__esModule = true;
exports.Tab = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Button = require("../Button");
var _Text = require("../Text");
var _TabsContext = require("../Tabs/TabsContext");
var _utils = require("../../utils");
var _StyledTab = require("./StyledTab");
var _propTypes = require("./propTypes");
var _useIsomorphicLayoutEffect = require("../../utils/use-isomorphic-layout-effect");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["active", "disabled", "children", "icon", "plain", "title", "onBlur", "onFocus", "onMouseOver", "onMouseOut", "reverse", "onClick"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
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
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
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
    console.warn(// eslint-disable-next-line max-len
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
    var _theme$tab;
    withIconStyles = {
      direction: 'row',
      align: 'center',
      justify: 'center',
      gap: (_theme$tab = theme.tab) == null ? void 0 : _theme$tab.gap
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
  }, withIconStyles, tabStyles, passThemeFlag), first, second));
});
Tab.displayName = 'Tab';
Tab.propTypes = _propTypes.TabPropTypes;