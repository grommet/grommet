"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var doc = function doc(Table) {
  var DocumentedTable = (0, _reactDesc.describe)(Table).availableAt((0, _utils.getAvailableAtBadge)('Table')).description('A table of data organized in cells.').usage("import { Table, TableHeader, TableFooter, TableBody, TableRow } from 'grommet';\n<Table />");
  DocumentedTable.propTypes = _extends({}, _utils.genericProps, {
    caption: _reactDesc.PropTypes.string.description('One line description.')
  });
  return DocumentedTable;
};

exports.doc = doc;