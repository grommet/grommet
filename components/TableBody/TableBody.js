"use strict";

exports.__esModule = true;
exports.TableBody = void 0;

var _react = _interopRequireDefault(require("react"));

var _TableContext = require("../Table/TableContext");

var _StyledTable = require("../Table/StyledTable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableBody = function TableBody(props) {
  return _react.default.createElement(_TableContext.TableContext.Provider, {
    value: "body"
  }, _react.default.createElement(_StyledTable.StyledTableBody, props));
};

var TableBodyDoc;

if (process.env.NODE_ENV !== 'production') {
  TableBodyDoc = require('./doc').doc(TableBody); // eslint-disable-line global-require
}

var TableBodyWrapper = TableBodyDoc || TableBody;
exports.TableBody = TableBodyWrapper;