"use strict";

exports.__esModule = true;
exports.TableRow = void 0;

var _react = _interopRequireDefault(require("react"));

var _StyledTable = require("../Table/StyledTable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableRow = function TableRow(props) {
  return _react.default.createElement(_StyledTable.StyledTableRow, props);
};

var TableRowDoc;

if (process.env.NODE_ENV !== 'production') {
  TableRowDoc = require('./doc').doc(TableRow); // eslint-disable-line global-require
}

var TableRowWrapper = TableRowDoc || TableRow;
exports.TableRow = TableRowWrapper;