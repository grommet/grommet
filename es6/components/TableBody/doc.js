import { describe } from 'react-desc';
export var doc = function doc(TableBody) {
  var DocumentedTableBody = describe(TableBody).description('The body of a table.').usage("import { TableBody } from 'grommet';\n<TableBody />").intrinsicElement('tbody');
  return DocumentedTableBody;
};