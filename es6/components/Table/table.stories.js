import React from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Table, TableBody, TableCell, TableFooter, TableHeader, TableRow, Text } from 'grommet';
import { grommet } from 'grommet/themes'; // Always should store amount in cents to avoid precision errors

var DATA = [{
  id: 1,
  name: 'Eric',
  email: 'eric@local',
  amount: 3775
}, {
  id: 2,
  name: 'Chris',
  email: 'chris@local',
  amount: 5825
}, {
  id: 3,
  name: 'Alan',
  email: 'alan@local',
  amount: 4300
}];
var TOTAL = 0;
DATA.forEach(function (datum) {
  TOTAL += datum.amount;
});
var amountFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});
var COLUMNS = [{
  property: 'name',
  label: 'Name',
  dataScope: 'row',
  format: function format(datum) {
    return React.createElement(Text, {
      weight: "bold"
    }, datum.name);
  }
}, {
  property: 'email',
  label: 'Email'
}, {
  property: 'amount',
  label: 'Amount',
  align: 'end',
  footer: amountFormatter.format(TOTAL / 100),
  format: function format(datum) {
    return amountFormatter.format(datum.amount / 100);
  }
}];

var DefaultTable = function DefaultTable() {
  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Table, {
    caption: "Default Table"
  }, React.createElement(TableHeader, null, React.createElement(TableRow, null, COLUMNS.map(function (c) {
    return React.createElement(TableCell, {
      key: c.property,
      scope: "col",
      align: c.align
    }, React.createElement(Text, null, c.label));
  }))), React.createElement(TableBody, null, DATA.map(function (datum) {
    return React.createElement(TableRow, {
      key: datum.id
    }, COLUMNS.map(function (c) {
      return React.createElement(TableCell, {
        key: c.property,
        scope: c.dataScope,
        align: c.align
      }, React.createElement(Text, null, c.format ? c.format(datum) : datum[c.property]));
    }));
  })), React.createElement(TableFooter, null, React.createElement(TableRow, null, COLUMNS.map(function (c) {
    return React.createElement(TableCell, {
      key: c.property,
      align: c.align
    }, React.createElement(Text, null, c.footer));
  })))));
};

var customTheme = {
  global: {},
  table: {
    header: {
      background: {
        color: 'accent-1',
        opacity: true
      }
    },
    body: {
      border: 'bottom'
    },
    footer: {
      border: undefined
    }
  }
};

var CustomThemeTable = function CustomThemeTable() {
  return React.createElement(Grommet, {
    theme: customTheme
  }, React.createElement(Table, {
    caption: "Custom Theme Table"
  }, React.createElement(TableHeader, null, React.createElement(TableRow, null, COLUMNS.map(function (c) {
    return React.createElement(TableCell, {
      key: c.property,
      scope: "col",
      align: c.align
    }, React.createElement(Text, null, c.label));
  }))), React.createElement(TableBody, null, DATA.map(function (datum) {
    return React.createElement(TableRow, {
      key: datum.id
    }, COLUMNS.map(function (c) {
      return React.createElement(TableCell, {
        key: c.property,
        scope: c.dataScope,
        align: c.align
      }, React.createElement(Text, null, c.format ? c.format(datum) : datum[c.property]));
    }));
  })), React.createElement(TableFooter, null, React.createElement(TableRow, null, COLUMNS.map(function (c) {
    return React.createElement(TableCell, {
      key: c.property,
      align: c.align
    }, React.createElement(Text, null, c.footer));
  })))));
};

storiesOf('Table', module).add('Default', function () {
  return React.createElement(DefaultTable, null);
}).add('Custom Theme', function () {
  return React.createElement(CustomThemeTable, null);
});