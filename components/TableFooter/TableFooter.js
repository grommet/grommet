"use strict";

exports.__esModule = true;
exports.TableFooter = void 0;

var _react = _interopRequireDefault(require("react"));

var _TableContext = require("../Table/TableContext");

var _StyledTable = require("../Table/StyledTable");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TableFooter = function TableFooter(props) {
  return _react.default.createElement(_TableContext.TableContext.Provider, {
    value: "footer"
  }, _react.default.createElement(_StyledTable.StyledTableFooter, props));
};

var TableFooterDoc;

if (process.env.NODE_ENV !== 'production') {
  TableFooterDoc = require('./doc').doc(TableFooter); // eslint-disable-line global-require
}

var TableFooterWrapper = TableFooterDoc || TableFooter;
exports.TableFooter = TableFooterWrapper;