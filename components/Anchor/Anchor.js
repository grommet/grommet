"use strict";

exports.__esModule = true;
exports.Anchor = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = require("styled-components");
var _defaultProps = require("../../default-props");
var _utils = require("../../utils");
var _Box = require("../Box");
var _StyledAnchor = require("./StyledAnchor");
var _propTypes = require("./propTypes");
var _AnalyticsContext = require("../../contexts/AnalyticsContext");
var _TextContext = require("../Text/TextContext");
var _excluded = ["a11yTitle", "aria-label", "children", "color", "disabled", "gap", "href", "icon", "label", "onBlur", "onClick", "onFocus", "reverse", "size"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var Anchor = exports.Anchor = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
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
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;
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
    var _theme$anchor;
    coloredIcon = /*#__PURE__*/(0, _react.cloneElement)(icon, {
      color: (0, _utils.normalizeColor)(color || ((_theme$anchor = theme.anchor) == null || (_theme$anchor = _theme$anchor.size) == null || (_theme$anchor = _theme$anchor[sizeProp || size]) == null ? void 0 : _theme$anchor.color) || theme.anchor.color, theme)
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
  }), first && second ? /*#__PURE__*/_react["default"].createElement(_Box.Box, {
    as: "span",
    direction: "row",
    align: "center",
    gap: gap || theme.anchor.gap,
    responsive: false,
    style: {
      display: 'inline-flex'
    }
  }, first, second) : first || second || children);
});
Anchor.displayName = 'Anchor';
Anchor.propTypes = _propTypes.AnchorPropTypes;