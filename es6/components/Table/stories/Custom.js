import React from 'react';
import { Box, Grommet, Table, TableBody, TableCell, TableFooter, TableHeader, TableRow, Text } from 'grommet';
import { data, columns } from './data';
var customTheme = {
  global: {
    font: {
      family: 'Helvetica'
    }
  },
  table: {
    body: {
      align: 'center',
      pad: {
        horizontal: 'large',
        vertical: 'xsmall'
      },
      border: 'horizontal'
    },
    extend: function extend() {
      return "font-family: Arial";
    },
    footer: {
      align: 'start',
      border: undefined,
      pad: {
        horizontal: 'large',
        vertical: 'small'
      },
      verticalAlign: 'bottom'
    },
    header: {
      align: 'center',
      border: 'bottom',
      fill: 'horizontal',
      pad: {
        horizontal: 'large',
        vertical: 'xsmall'
      },
      verticalAlign: 'bottom',
      background: {
        color: 'accent-1',
        opacity: 'strong'
      }
    }
  }
};
export var Custom = function Custom() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: customTheme
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Table, {
    caption: "Custom Theme Table"
  }, /*#__PURE__*/React.createElement(TableHeader, null, /*#__PURE__*/React.createElement(TableRow, null, columns.map(function (c) {
    return /*#__PURE__*/React.createElement(TableCell, {
      key: c.property,
      scope: "col",
      align: c.align
    }, /*#__PURE__*/React.createElement(Text, null, c.label));
  }))), /*#__PURE__*/React.createElement(TableBody, null, data.map(function (datum) {
    return /*#__PURE__*/React.createElement(TableRow, {
      key: datum.id
    }, columns.map(function (c) {
      return /*#__PURE__*/React.createElement(TableCell, {
        key: c.property,
        scope: c.dataScope,
        align: c.align
      }, /*#__PURE__*/React.createElement(Text, null, c.format ? c.format(datum) : datum[c.property]));
    }));
  })), /*#__PURE__*/React.createElement(TableFooter, null, /*#__PURE__*/React.createElement(TableRow, null, columns.map(function (c) {
    return /*#__PURE__*/React.createElement(TableCell, {
      key: c.property,
      align: c.align
    }, /*#__PURE__*/React.createElement(Text, null, c.footer));
  }))))));
};
export default {
  title: 'Visualizations/Table/Custom'
};