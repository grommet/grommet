"use strict";

exports.__esModule = true;
exports.Grid = void 0;
var _react = _interopRequireWildcard(require("react"));
var _StyledGrid = require("./StyledGrid");
var _propTypes = require("./propTypes");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _contexts = require("../../contexts");
var _excluded = ["a11yTitle", "aria-label", "border", "fill", "height", "responsive", "rows", "tag", "as", "width"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Grid = exports.Grid = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  var a11yTitle = props.a11yTitle,
    ariaLabel = props['aria-label'],
    border = props.border,
    fill = props.fill,
    height = props.height,
    _props$responsive = props.responsive,
    responsiveProp = _props$responsive === void 0 ? true : _props$responsive,
    rows = props.rows,
    tag = props.tag,
    as = props.as,
    width = props.width,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    passThemeFlag = _useThemeValue.passThemeFlag;
  var responsiveContainer = (0, _react.useContext)(_contexts.ResponsiveContainerContext);
  var responsive = responsiveContainer && responsiveProp ? 'container' : responsiveProp;
  return /*#__PURE__*/_react["default"].createElement(_StyledGrid.StyledGrid, _extends({
    ref: ref,
    "aria-label": ariaLabel || a11yTitle,
    as: !as && tag ? tag : as,
    border: border,
    fillContainer: fill,
    heightProp: height,
    responsive: responsive,
    rowsProp: rows,
    widthProp: width
  }, passThemeFlag, rest));
});
Grid.displayName = 'Grid';
Grid.propTypes = _propTypes.GridPropTypes;

// Defualting to true to support existing code that relies on
// grid.available to create a fallback option
Grid.available = true;