"use strict";

exports.__esModule = true;
exports.Table = void 0;

var _react = _interopRequireDefault(require("react"));

var _StyledTable = require("./StyledTable");

var _propTypes = require("./propTypes");

var _excluded = ["caption", "children"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var Table = function Table(_ref) {
  var caption = _ref.caption,
      children = _ref.children,
      rest = _objectWithoutPropertiesLoose(_ref, _excluded);

  return /*#__PURE__*/_react["default"].createElement(_StyledTable.StyledTable, rest, caption ? /*#__PURE__*/_react["default"].createElement(_StyledTable.StyledTableDataCaption, null, caption) : null, children);
};

exports.Table = Table;
Table.propTypes = _propTypes.TablePropTypes;