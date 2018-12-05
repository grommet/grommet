import { describe } from 'react-desc';
export var doc = function doc(TableFooter) {
  var DocumentedTableFooter = describe(TableFooter).description('The footer of a table.').usage("import { TableFooter } from 'grommet';\n<TableFooter />").intrinsicElement('tfoot');
  return DocumentedTableFooter;
};