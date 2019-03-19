import React from 'react';
import { storiesOf } from '@storybook/react';
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

var CustomThemeTable = function CustomThemeTable() {
  return React.createElement(Grommet, {
    theme: customTheme
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(Text, {
    margin: {
      vertical: 'medium'
    }
  }, "this Table is using a Custom theme"), React.createElement(Table, {
    caption: "Custom Theme Table"
  }, React.createElement(TableHeader, null, React.createElement(TableRow, null, columns.map(function (c) {
    return React.createElement(TableCell, {
      key: c.property,
      scope: "col",
      align: c.align
    }, React.createElement(Text, null, c.label));
  }))), React.createElement(TableBody, null, data.map(function (datum) {
    return React.createElement(TableRow, {
      key: datum.id
    }, columns.map(function (c) {
      return React.createElement(TableCell, {
        key: c.property,
        scope: c.dataScope,
        align: c.align
      }, React.createElement(Text, null, c.format ? c.format(datum) : datum[c.property]));
    }));
  })), React.createElement(TableFooter, null, React.createElement(TableRow, null, columns.map(function (c) {
    return React.createElement(TableCell, {
      key: c.property,
      align: c.align
    }, React.createElement(Text, null, c.footer));
  }))))));
};

storiesOf('Table', module).add('Custom', function () {
  return React.createElement(CustomThemeTable, null);
});