"use strict";

exports.__esModule = true;
exports.themeDoc = exports.doc = void 0;

var _reactDesc = require("react-desc");

var _utils = require("../../utils");

var _themeDocUtils = require("../../utils/themeDocUtils");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var doc = function doc(Table) {
  var DocumentedTable = (0, _reactDesc.describe)(Table).availableAt((0, _utils.getAvailableAtBadge)('Table')).description('A table of data organized in cells.').usage("import { Table, TableHeader, TableFooter, TableBody, TableRow } from 'grommet';\n<Table />").intrinsicElement('table');
  DocumentedTable.propTypes = _extends({}, _utils.genericProps, {
    caption: _reactDesc.PropTypes.string.description('One line description.')
  });
  return DocumentedTable;
};

exports.doc = doc;

var themeDoc = _extends({}, _themeDocUtils.themeDocUtils.responsiveBreakpoint('The actual breakpoint to trigger changes in Table.'), {
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

exports.themeDoc = themeDoc;