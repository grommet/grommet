"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var doc = function doc(TableFooter) {
  var DocumentedTableFooter = (0, _reactDesc.describe)(TableFooter).description('The footer of a table.').usage("import { TableFooter } from 'grommet';\n<TableFooter />").intrinsicElement('tfoot');
  return DocumentedTableFooter;
};

exports.doc = doc;