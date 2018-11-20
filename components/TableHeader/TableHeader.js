"use strict";

exports.__esModule = true;
exports.TableHeader = void 0;

var _react = _interopRequireDefault(require("react"));

var _TableContext = require("../Table/TableContext");

var _StyledTable = require("../Table/StyledTable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableHeader = function TableHeader(props) {
  return _react.default.createElement(_TableContext.TableContext.Provider, {
    value: "header"
  }, _react.default.createElement(_StyledTable.StyledTableHeader, props));
};

var TableHeaderDoc;

if (process.env.NODE_ENV !== 'production') {
  TableHeaderDoc = require('./doc').doc(TableHeader); // eslint-disable-line global-require
}

var TableHeaderWrapper = TableHeaderDoc || TableHeader;
exports.TableHeader = TableHeaderWrapper;