"use strict";

exports.__esModule = true;
exports.Spinner = void 0;
var _react = _interopRequireWildcard(require("react"));
var _AnnounceContext = require("../../contexts/AnnounceContext");
var _Box = require("../Box");
var _propTypes = require("./propTypes");
var _useThemeValue3 = require("../../utils/useThemeValue");
var _excluded = ["ref", "size"],
  _excluded2 = ["children", "color", "size", "message"],
  _excluded3 = ["size", "color", "border"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var BasicSpinner = function BasicSpinner(_ref) {
  var ref = _ref.ref,
    size = _ref.size,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = (0, _useThemeValue3.useThemeValue)(),
    theme = _useThemeValue.theme;
  return /*#__PURE__*/_react["default"].createElement(_Box.Box, _extends({
    flex: false,
    height: size,
    width: size,
    ref: ref,
    responsive: theme.spinner.responsive
  }, rest));
};
/**
 * If the user is calling <Spinner>…</Spinner> with children, it will take
 * precedence over theme styling. Yet, it will still inherit the
 * default animation and size of the spinner, and of course any additional
 * given props.
 *
 * If the user is providing an icon/svg via the theme.spinner.icon,
 * the Spinner will use it as a child and will include all its relevant
 * theme props (size/color/pad…) as well,
 * user will only need to type <Spinner />.
 * If the icon has its own animation, user can turn it off via the theme.
 *
 * If none of the above is provider, <Spinner /> will provide its default
 * border, size and friends, all configurable via theme or props.
 */
var Spinner = exports.Spinner = /*#__PURE__*/(0, _react.forwardRef)(function (_ref2, ref) {
  var children = _ref2.children,
    colorProp = _ref2.color,
    size = _ref2.size,
    message = _ref2.message,
    rest = _objectWithoutPropertiesLoose(_ref2, _excluded2);
  var _useThemeValue2 = (0, _useThemeValue3.useThemeValue)(),
    theme = _useThemeValue2.theme;
  var announce = (0, _react.useContext)(_AnnounceContext.AnnounceContext);
  (0, _react.useEffect)(function () {
    if (message != null && message.start) announce(message.start);else if (typeof message === 'string') announce(message);
    return function () {
      return (message == null ? void 0 : message.end) && announce(message.end);
    };
  }, [announce, message]);

  // Avoid color and size leaking into the DOM
  var _theme$spinner$contai = theme.spinner.container,
    sizeThemeProp = _theme$spinner$contai.size,
    colorThemeProp = _theme$spinner$contai.color,
    borderThemeProp = _theme$spinner$contai.border,
    themeProps = _objectWithoutPropertiesLoose(_theme$spinner$contai, _excluded3);
  var normalizedSize = size || sizeThemeProp;
  var spinnerSize = theme.spinner.size[normalizedSize] || normalizedSize;
  var color = colorProp || colorThemeProp;
  var Icon = theme.spinner.icon;
  var defaultBorder = [{
    side: 'all',
    color: 'background-contrast',
    size: size
  }, {
    side: 'top',
    color: color,
    size: size
  }];
  var spinnerBorder = Array.isArray(borderThemeProp) ? borderThemeProp.map(function (borderSide) {
    return _extends({}, borderSide, {
      color: borderSide.side === 'all' ? borderSide.color || 'background-contrast' : color
    });
  }) : borderThemeProp;

  // children will take precedence over theme attributes
  if (children) {
    return /*#__PURE__*/_react["default"].createElement(BasicSpinner, _extends({
      size: spinnerSize,
      ref: ref
    }, rest), children);
  }

  // In case icon is provided by the theme
  if (Icon) return /*#__PURE__*/_react["default"].createElement(BasicSpinner, _extends({
    size: spinnerSize,
    ref: ref
  }, themeProps, rest), /*#__PURE__*/(0, _react.isValidElement)(Icon) ? Icon : /*#__PURE__*/_react["default"].createElement(Icon, {
    size: spinnerSize,
    color: color
  }));
  return /*#__PURE__*/_react["default"].createElement(BasicSpinner, _extends({
    size: spinnerSize,
    ref: ref,
    border: typeof borderThemeProp === 'undefined' ? defaultBorder : spinnerBorder
  }, themeProps, rest));
});
Spinner.displayName = 'Spinner';
Spinner.propTypes = _propTypes.SpinnerPropTypes;