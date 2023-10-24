"use strict";

exports.__esModule = true;
exports.Cell = void 0;
var _react = _interopRequireWildcard(require("react"));
var _styledComponents = require("styled-components");
var _defaultProps = require("../../default-props");
var _Text = require("../Text");
var _StyledDataTable = require("./StyledDataTable");
var _buildState = require("./buildState");
var _TableContext = require("../Table/TableContext");
var _excluded = ["background", "border", "column", "datum", "pad", "pin", "pinnedOffset", "primaryProperty", "scope", "verticalAlign"];
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
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
  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;
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
  }, rest), content);
});
Cell.displayName = 'Cell';
Cell.defaultProps = {};
Object.setPrototypeOf(Cell.defaultProps, _defaultProps.defaultProps);