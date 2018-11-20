import { describe, PropTypes } from 'react-desc';
export var doc = function doc(TableCell) {
  var DocumentedTableCell = describe(TableCell).description('A cell of data in a table.').usage("import { TableCell } from 'grommet';\n<TableCell />");
  DocumentedTableCell.propTypes = {
    plain: PropTypes.bool.description('Whether default styling context should be removed.').defaultValue(false),
    scope: PropTypes.oneOf(['col', 'row']).description("For header cells, what scope the header is for.\n        Typically, the cells in a TableHeader have 'col' scope and\n        the primary cell in each row in the TableBody has 'row' scope."),
    size: PropTypes.oneOfType([PropTypes.oneOf(['xxsmall', 'xsmall', 'small', 'medium', 'large', 'xlarge', '1/2', '1/3', '2/3', '1/4', '2/4', '3/4']), PropTypes.string]).description("What size the cell should be. Typically, this is not needed\n      unless you are trying to align multiple tables."),
    verticalAlign: PropTypes.oneOf(['top', 'middle', 'bottom']).description('How to align the contents vertically.')
  };
  return DocumentedTableCell;
};