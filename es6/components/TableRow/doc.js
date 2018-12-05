import { describe } from 'react-desc';
export var doc = function doc(TableRow) {
  var DocumentedTableRow = describe(TableRow).description('A row of cells in a table.').usage("import { TableRow } from 'grommet';\n<TableRow />").intrinsicElement('tr');
  return DocumentedTableRow;
};