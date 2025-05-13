"use strict";

exports.__esModule = true;
exports.Cell = void 0;
var _react = _interopRequireWildcard(require("react"));
var _Text = require("../Text");
var _StyledDataTable = require("./StyledDataTable");
var _buildState = require("./buildState");
var _TableContext = require("../Table/TableContext");
var _useThemeValue2 = require("../../utils/useThemeValue");
var _excluded = ["background", "border", "column", "datum", "pad", "pin", "pinnedOffset", "primaryProperty", "scope", "verticalAlign"];
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var Cell = exports.Cell = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var background = _ref.background,
    border = _ref.border,
    _ref$column = _ref.column,
    align = _ref$column.align,
    columnPin = _ref$column.pin,
    plain = _ref$column.plain,
    footer = _ref$column.footer,
    property = _ref$column.property,
    render = _ref$column.render,
    columnVerticalAlign = _ref$column.verticalAlign,
    size = _ref$column.size,
    datum = _ref.datum,
    pad = _ref.pad,
    cellPin = _ref.pin,
    pinnedOffset = _ref.pinnedOffset,
    primaryProperty = _ref.primaryProperty,
    scope = _ref.scope,
    verticalAlign = _ref.verticalAlign,
    rest = _objectWithoutPropertiesLoose(_ref, _excluded);
  var _useThemeValue = (0, _useThemeValue2.useThemeValue)(),
    theme = _useThemeValue.theme,
    passThemeFlag = _useThemeValue.passThemeFlag;
  var value = (0, _buildState.datumValue)(datum, property);
  var context = (0, _react.useContext)(_TableContext.TableContext);
  var renderContexts = context === 'body' || context === 'footer' && footer && footer.aggregate;
  var content;
  if (render && renderContexts) {
    content = render(datum);
  } else if (value !== undefined) {
    if (typeof value === 'string' || typeof value === 'number' || /*#__PURE__*/(0, _react.isValidElement)(value)) content = value;
  }
  if (typeof content === 'string' || typeof content === 'number') {
    var textProps = property === primaryProperty ? theme.dataTable.primary : {};
    content = /*#__PURE__*/_react["default"].createElement(_Text.Text, textProps, content);
  }
  var pin = [];
  if (cellPin) pin.push.apply(pin, cellPin);
  if (columnPin) pin.push('left');
  return /*#__PURE__*/_react["default"].createElement(_StyledDataTable.StyledDataTableCell, _extends({
    scope: scope
  }, theme.dataTable[context], {
    align: align,
    context: context,
    verticalAlign: verticalAlign || columnVerticalAlign,
    size: size,
    background: background,
    pinnedOffset: pinnedOffset,
    border: border,
    pad: pad,
    pin: pin,
    plain: plain ? 'noPad' : undefined
  }, passThemeFlag, rest), content);
});
Cell.displayName = 'Cell';