"use strict";

exports.__esModule = true;
exports.TableCell = void 0;

var _react = _interopRequireDefault(require("react"));

var _recompose = require("recompose");

var _styledComponents = require("styled-components");

var _defaultProps = require("../../default-props");

var _Box = require("../Box");

var _TableContext = require("../Table/TableContext");

var _StyledTable = require("../Table/StyledTable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var TableCell = function TableCell(_ref) {
  var children = _ref.children,
      colSpan = _ref.colSpan,
      plain = _ref.plain,
      scope = _ref.scope,
      size = _ref.size,
      theme = _ref.theme,
      verticalAlign = _ref.verticalAlign,
      rest = _objectWithoutPropertiesLoose(_ref, ["children", "colSpan", "plain", "scope", "size", "theme", "verticalAlign"]);

  return _react.default.createElement(_TableContext.TableContext.Consumer, null, function (tableContext) {
    var tableContextTheme;

    if (tableContext === 'header') {
      tableContextTheme = theme.table && theme.table.header;
    } else if (tableContext === 'footer') {
      tableContextTheme = theme.table && theme.table.footer;
    } else {
      tableContextTheme = theme.table && theme.table.body;
    }

    var boxProps = _extends({}, rest);

    Object.keys(boxProps).forEach(function (key) {
      if (tableContextTheme[key] && boxProps[key] === undefined) {
        delete boxProps[key];
      }
    });
    return _react.default.createElement(_StyledTable.StyledTableCell, _extends({
      as: scope ? 'th' : undefined,
      scope: scope,
      size: size,
      colSpan: colSpan,
      tableContext: tableContext,
      tableContextTheme: tableContextTheme,
      verticalAlign: verticalAlign || (tableContextTheme ? tableContextTheme.verticalAlign : undefined)
    }, plain ? rest : {}), plain ? children : _react.default.createElement(_Box.Box, _extends({}, tableContextTheme, boxProps), children));
  });
};

TableCell.defaultProps = {};
Object.setPrototypeOf(TableCell.defaultProps, _defaultProps.defaultProps);
var TableCellDoc;

if (process.env.NODE_ENV !== 'production') {
  TableCellDoc = require('./doc').doc(TableCell); // eslint-disable-line global-require
}

var TableCellWrapper = (0, _recompose.compose)(_styledComponents.withTheme)(TableCellDoc || TableCell);
exports.TableCell = TableCellWrapper;