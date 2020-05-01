import React from 'react';
import { TableContext } from '../Table/TableContext';
import { StyledTableFooter } from '../Table/StyledTable';

var TableFooter = function TableFooter(props) {
  return /*#__PURE__*/React.createElement(TableContext.Provider, {
    value: "footer"
  }, /*#__PURE__*/React.createElement(StyledTableFooter, props));
};

var TableFooterDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  TableFooterDoc = require('./doc').doc(TableFooter);
}

var TableFooterWrapper = TableFooterDoc || TableFooter;
export { TableFooterWrapper as TableFooter };