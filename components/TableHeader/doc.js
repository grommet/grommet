"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var doc = function doc(TableHeader) {
  var DocumentedTableHeader = (0, _reactDesc.describe)(TableHeader).description('The header of a table.').usage("import { TableHeader } from 'grommet';\n<TableHeader />").intrinsicElement('thead');
  return DocumentedTableHeader;
};

exports.doc = doc;