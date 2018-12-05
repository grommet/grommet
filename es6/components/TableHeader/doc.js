import { describe } from 'react-desc';
export var doc = function doc(TableHeader) {
  var DocumentedTableHeader = describe(TableHeader).description('The header of a table.').usage("import { TableHeader } from 'grommet';\n<TableHeader />").intrinsicElement('thead');
  return DocumentedTableHeader;
};