"use strict";

exports.__esModule = true;
exports.Cell = void 0;

var _react = _interopRequireDefault(require("react"));

var _TableCell = require("../TableCell");

var _Text = require("../Text");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Cell = function Cell(_ref) {
  var _ref$column = _ref.column,
      align = _ref$column.align,
      property = _ref$column.property,
      primary = _ref$column.primary,
      render = _ref$column.render,
      context = _ref.context,
      datum = _ref.datum,
      scope = _ref.scope,
      theme = _ref.theme;
  var content;

  if (render) {
    if (datum[property]) {
      content = render(datum);
    }
  } else if (datum[property]) {
    content = datum[property];
  }

  if (typeof content === 'string' || typeof content === 'number') {
    var textProps = primary ? theme.dataTable.primary : {};
    content = _react.default.createElement(_Text.Text, textProps, content);
  }

  return _react.default.createElement(_TableCell.TableCell, _extends({
    scope: scope
  }, theme.dataTable[context], {
    align: align
  }), content);
};

exports.Cell = Cell;