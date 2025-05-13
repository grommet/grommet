"use strict";

exports.__esModule = true;
exports.Anchor = void 0;
var _react = _interopRequireWildcard(require("react"));
var _utils = require("../../utils");
var _Box = require("../Box");
var _StyledAnchor = require("./StyledAnchor");
var _propTypes = require("./propTypes");
var _AnalyticsContext = require("../../contexts/AnalyticsContext");
var _TextContext = require("../Text/TextContext");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["a11yTitle", "aria-label", "children", "color", "disabled", "gap", "href", "icon", "label", "onBlur", "onClick", "onFocus", "reverse", "size"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Anchor = exports.Anchor = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var _theme$anchor3, _theme$anchor4;
  var a11yTitle = _ref.a11yTitle,
    ariaLabel = _ref['aria-label'],
    children = _ref.children,
    color = _ref.color,
    disabled = _ref.disabled,
    gap = _ref.gap,
    href = _ref.href,
    icon = _ref.icon,
    label = _ref.label,
    _onBlur = _ref.onBlur,
    onClickProp = _ref.onClick,
    _onFocus = _ref.onFocus,
    reverse = _ref.reverse,
    sizeProp = _ref.size,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var _useState = (0, _react.useState)(),
    focus = _useState[0],
    setFocus = _useState[1];
  var _useContext = (0, _react.useContext)(_TextContext.TextContext),
    size = _useContext.size;
  var sendAnalytics = (0, _AnalyticsContext.useAnalytics)();
  var onClick = (0, _react.useCallback)(function (event) {
    sendAnalytics({
      type: 'anchorClick',
      element: (0, _utils.findButtonParent)(event.target),
      event: event,
      href: href,
      label: typeof label === 'string' ? label : undefined
    });
    if (onClickProp) onClickProp(event);
  }, [onClickProp, sendAnalytics, label, href]);
  (0, _react.useEffect)(function () {
    if ((icon || label) && children) {
      console.warn('Anchor should not have children if icon or label is provided');
    }
  }, [children, icon, label]);
  var coloredIcon = icon;
  if (icon && !icon.props.color) {
    var _theme$anchor, _theme$anchor2;
    coloredIcon = /*#__PURE__*/(0, _react.cloneElement)(icon, {
      color: (0, _utils.normalizeColor)(color || ((_theme$anchor = theme.anchor) == null || (_theme$anchor = _theme$anchor.icon) == null ? void 0 : _theme$anchor.color) || ((_theme$anchor2 = theme.anchor) == null || (_theme$anchor2 = _theme$anchor2.size) == null || (_theme$anchor2 = _theme$anchor2[sizeProp || size]) == null ? void 0 : _theme$anchor2.color) || theme.anchor.color, theme)
    });
  }
  var anchorIcon = (0, _utils.useSizedIcon)(coloredIcon, sizeProp || size, theme);
  var first = reverse ? label : anchorIcon;
  var second = reverse ? anchorIcon : label;
  return /*#__PURE__*/_react["default"].createElement(_StyledAnchor.StyledAnchor, _extends({}, rest, {
    ref: ref,
    "aria-label": ariaLabel || a11yTitle,
    colorProp: color,
    disabled: disabled,
    hasIcon: !!icon,
    focus: focus,
    hasLabel: label,
    reverse: reverse,
    href: !disabled ? href : undefined,
    onClick: !disabled ? onClick : undefined,
    onFocus: function onFocus(event) {
      setFocus(true);
      if (_onFocus) _onFocus(event);
    },
    onBlur: function onBlur(event) {
      setFocus(false);
      if (_onBlur) _onBlur(event);
    },
    size: sizeProp || size
  }, passThemeFlag), first && second ? /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    as: "span",
    direction: "row",
    align: "center",
    gap: gap || ((_theme$anchor3 = theme.anchor) == null || (_theme$anchor3 = _theme$anchor3.size) == null || (_theme$anchor3 = _theme$anchor3[sizeProp]) == null ? void 0 : _theme$anchor3.gap) || ((_theme$anchor4 = theme.anchor) == null ? void 0 : _theme$anchor4.gap),
    responsive: false
  }, first, second) : first || second || children);
});
Anchor.displayName = 'Anchor';
Anchor.propTypes = _propTypes.AnchorPropTypes;