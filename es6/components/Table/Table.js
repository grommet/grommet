function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { StyledTable, StyledTableDataCaption } from './StyledTable';

var Table = function Table(_ref) {
  var caption = _ref.caption,
      children = _ref.children,
      rest = _objectWithoutPropertiesLoose(_ref, ["caption", "children"]);

  return /*#__PURE__*/React.createElement(StyledTable, rest, caption ? /*#__PURE__*/React.createElement(StyledTableDataCaption, null, caption) : null, children);
};

var TableDoc;

if (process.env.NODE_ENV !== 'production') {
  TableDoc = require('./doc').doc(Table); // eslint-disable-line global-require
}

var TableWrapper = TableDoc || Table;
export { TableWrapper as Table };