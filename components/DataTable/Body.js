"use strict";

exports.__esModule = true;
exports.Body = void 0;

var _react = _interopRequireDefault(require("react"));

var _InfiniteScroll = require("../InfiniteScroll");

var _TableRow = require("../TableRow");

var _TableCell = require("../TableCell");

var _Cell = require("./Cell");

var _StyledDataTable = require("./StyledDataTable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Body = function Body(_ref) {
  var columns = _ref.columns,
      data = _ref.data,
      onMore = _ref.onMore,
      primaryProperty = _ref.primaryProperty,
      size = _ref.size,
      step = _ref.step,
      theme = _ref.theme,
      rest = _objectWithoutPropertiesLoose(_ref, ["columns", "data", "onMore", "primaryProperty", "size", "step", "theme"]);

  return _react.default.createElement(_StyledDataTable.StyledDataTableBody, _extends({
    size: size
  }, rest), _react.default.createElement(_InfiniteScroll.InfiniteScroll, {
    items: data,
    onMore: onMore,
    renderMarker: function renderMarker(marker) {
      return _react.default.createElement(_TableRow.TableRow, null, _react.default.createElement(_TableCell.TableCell, null, marker));
    },
    scrollableAncestor: "window",
    step: step
  }, function (datum) {
    return _react.default.createElement(_StyledDataTable.StyledDataTableRow, {
      key: datum[primaryProperty],
      size: size
    }, columns.map(function (column) {
      return _react.default.createElement(_Cell.Cell, {
        key: column.property,
        context: "body",
        column: column,
        datum: datum,
        primaryProperty: primaryProperty,
        scope: column.primary || column.property === primaryProperty ? 'row' : undefined
      });
    }));
  }));
};

exports.Body = Body;