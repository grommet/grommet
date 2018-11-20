function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { genericProps, getAvailableAtBadge } from '../../utils';
export var doc = function doc(Table) {
  var DocumentedTable = describe(Table).availableAt(getAvailableAtBadge('Table')).description('A table of data organized in cells.').usage("import { Table, TableHeader, TableFooter, TableBody, TableRow } from 'grommet';\n<Table />");
  DocumentedTable.propTypes = _extends({}, genericProps, {
    caption: PropTypes.string.description('One line description.')
  });
  return DocumentedTable;
};