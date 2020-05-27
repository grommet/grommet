function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import { describe, PropTypes } from 'react-desc';
import { genericProps, getAvailableAtBadge } from '../../utils';
import { themeDocUtils } from '../../utils/themeDocUtils';
export var doc = function doc(Table) {
  var DocumentedTable = describe(Table).availableAt(getAvailableAtBadge('Table')).description('A table of data organized in cells.').usage( // eslint-disable-next-line max-len
  "import { Table, TableHeader, TableFooter, TableBody, TableRow } from 'grommet';\n<Table />").intrinsicElement('table');
  DocumentedTable.propTypes = _extends({}, genericProps, {
    caption: PropTypes.string.description('One line description.')
  });
  return DocumentedTable;
};
export var themeDoc = _extends({}, themeDocUtils.responsiveBreakpoint('The actual breakpoint to trigger changes in Table.'), {
  'global.size': {
    description: 'The size that impacts max-width and width.',
    defaultValue: "{\n      xxsmall: '48px',\n      xsmall: '96px',\n      small: '192px',\n      medium: '384px',\n      large: '768px',\n      xlarge: '1152px',\n      xxlarge: '1536px',\n      full: '100%',\n      }"
  },
  'table.extend': {
    description: 'Any additional style for Table.',
    type: 'string | (props) => {}',
    defaultValue: undefined
  }
});