"use strict";

exports.__esModule = true;
exports.Grid = void 0;
var _react = _interopRequireWildcard(require("react"));
var _StyledGrid = require("./StyledGrid");
var _propTypes = require("./propTypes");
var _excluded = ["a11yTitle", "aria-label", "border", "fill", "height", "responsive", "rows", "tag", "as", "width"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (e.indexOf(n) >= 0) continue; t[n] = r[n]; } return t; }
var Grid = exports.Grid = /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
  var a11yTitle = props.a11yTitle,
    ariaLabel = props['aria-label'],
    border = props.border,
    fill = props.fill,
    height = props.height,
    _props$responsive = props.responsive,
    responsive = _props$responsive === void 0 ? true : _props$responsive,
    rows = props.rows,
    tag = props.tag,
    as = props.as,
    width = props.width,
    rest = _objectWithoutPropertiesLoose(props, _excluded);
  return /*#__PURE__*/_react["default"].createElement(_StyledGrid.StyledGrid, _extends({
    ref: ref,
    a11yTitleProp: ariaLabel || a11yTitle,
    as: !as && tag ? tag : as,
    border: border,
    fillContainer: fill,
    heightProp: height,
    responsive: responsive,
    rowsProp: rows,
    widthProp: width
  }, rest));
});
Grid.displayName = 'Grid';
Grid.propTypes = _propTypes.GridPropTypes;

// Defualting to true to support existing code that relies on
// grid.available to create a fallback option
Grid.available = true;