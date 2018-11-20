"use strict";

exports.__esModule = true;
exports.doc = void 0;

var _reactDesc = require("react-desc");

var doc = function doc(TableCell) {
  var DocumentedTableCell = (0, _reactDesc.describe)(TableCell).description('A cell of data in a table.').usage("import { TableCell } from 'grommet';\n<TableCell />");
  DocumentedTableCell.propTypes = {
    plain: _reactDesc.PropTypes.bool.description('Whether default styling context should be removed.').defaultValue(false),
    scope: _reactDesc.PropTypes.oneOf(['col', 'row']).description("For header cells, what scope the header is for.\n        Typically, the cells in a TableHeader have 'col' scope and\n        the primary cell in each row in the TableBody has 'row' scope."),
    size: _reactDesc.PropTypes.oneOfType([_reactDesc.PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', '1/2', '1/3', '2/3', '1/4', '2/4', '3/4']), _reactDesc.PropTypes.string]).description("What size the cell should be. Typically, this is not needed\n      unless you are trying to align multiple tables."),
    verticalAlign: _reactDesc.PropTypes.oneOf(['top', 'middle', 'bottom']).description('How to align the contents vertically.')
  };
  return DocumentedTableCell;
};

exports.doc = doc;