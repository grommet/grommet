import React from 'react';
import { TableContext } from '../Table/TableContext';
import { StyledTableFooter } from '../Table/StyledTable';

var TableFooter = function TableFooter(props) {
  return React.createElement(TableContext.Provider, {
    value: "footer"
  }, React.createElement(StyledTableFooter, props));
};

var TableFooterDoc;

if (process.env.NODE_ENV !== 'production') {
  TableFooterDoc = require('./doc').doc(TableFooter); // eslint-disable-line global-require
}

var TableFooterWrapper = TableFooterDoc || TableFooter;
export { TableFooterWrapper as TableFooter };