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

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var normalizeProp = function normalizeProp(name, rowProp, prop) {
  if (rowProp && rowProp[name]) return rowProp[name];
  return prop;
};

var Cell = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var backgroundProp = _ref.background,
      border = _ref.border,
      _ref$column = _ref.column,
      align = _ref$column.align,
      columnPin = _ref$column.pin,
      footer = _ref$column.footer,
      property = _ref$column.property,
      render = _ref$column.render,
      verticalAlign = _ref$column.verticalAlign,
      size = _ref$column.size,
      datum = _ref.datum,
      index = _ref.index,
      pad = _ref.pad,
      cellPin = _ref.pin,
      primaryProperty = _ref.primaryProperty,
      rowProp = _ref.rowProp,
      scope = _ref.scope;

  var theme = (0, _react.useContext)(_styledComponents.ThemeContext) || _defaultProps.defaultProps.theme;

  var value = (0, _buildState.datumValue)(datum, property);
  var context = (0, _react.useContext)(_TableContext.TableContext);
  var renderContexts = context === 'body' || context === 'footer' && footer && footer.aggregate;
  var content;

  if (render && renderContexts) {
    content = render(datum);
  } else if (value !== undefined) {
    content = value;
  }

  if (typeof content === 'string' || typeof content === 'number') {
    var textProps = property === primaryProperty ? theme.dataTable.primary : {};
    content = /*#__PURE__*/_react["default"].createElement(_Text.Text, textProps, content);
  }

  var pin;
  if (cellPin) pin = cellPin;else if (columnPin) pin = ['left'];
  var background;

  if (pin && theme.dataTable.pinned && theme.dataTable.pinned[context]) {
    background = theme.dataTable.pinned[context].background;

    if (!background.color && theme.background) {
      // theme context has an active background color but the
      // theme doesn't set an explicit color, repeat the context
      // background explicitly
      background = _extends({}, background, {
        color: (0, _buildState.normalizeBackgroundColor)(theme)
      });
    }
  } else background = undefined;

  return /*#__PURE__*/_react["default"].createElement(_StyledDataTable.StyledDataTableCell, _extends({
    scope: scope
  }, theme.dataTable[context], {
    align: align,
    context: context,
    verticalAlign: verticalAlign,
    size: size,
    background: normalizeProp('background', rowProp, Array.isArray(backgroundProp) ? backgroundProp[index % backgroundProp.length] : backgroundProp) || background,
    border: normalizeProp('border', rowProp, border),
    pad: normalizeProp('pad', rowProp, pad),
    pin: pin
  }), content);
});
exports.Cell = Cell;
Cell.displayName = 'Cell';
Cell.defaultProps = {};
Object.setPrototypeOf(Cell.defaultProps, _defaultProps.defaultProps);