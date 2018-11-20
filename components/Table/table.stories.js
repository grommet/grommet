"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Always should store amount in cents to avoid precision errors
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
    return _react.default.createElement(_grommet.Text, {
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
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Table, {
    caption: "Default Table"
  }, _react.default.createElement(_grommet.TableHeader, null, _react.default.createElement(_grommet.TableRow, null, COLUMNS.map(function (c) {
    return _react.default.createElement(_grommet.TableCell, {
      key: c.property,
      scope: "col",
      align: c.align
    }, _react.default.createElement(_grommet.Text, null, c.label));
  }))), _react.default.createElement(_grommet.TableBody, null, DATA.map(function (datum) {
    return _react.default.createElement(_grommet.TableRow, {
      key: datum.id
    }, COLUMNS.map(function (c) {
      return _react.default.createElement(_grommet.TableCell, {
        key: c.property,
        scope: c.dataScope,
        align: c.align
      }, _react.default.createElement(_grommet.Text, null, c.format ? c.format(datum) : datum[c.property]));
    }));
  })), _react.default.createElement(_grommet.TableFooter, null, _react.default.createElement(_grommet.TableRow, null, COLUMNS.map(function (c) {
    return _react.default.createElement(_grommet.TableCell, {
      key: c.property,
      align: c.align
    }, _react.default.createElement(_grommet.Text, null, c.footer));
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
  return _react.default.createElement(_grommet.Grommet, {
    theme: customTheme
  }, _react.default.createElement(_grommet.Table, {
    caption: "Custom Theme Table"
  }, _react.default.createElement(_grommet.TableHeader, null, _react.default.createElement(_grommet.TableRow, null, COLUMNS.map(function (c) {
    return _react.default.createElement(_grommet.TableCell, {
      key: c.property,
      scope: "col",
      align: c.align
    }, _react.default.createElement(_grommet.Text, null, c.label));
  }))), _react.default.createElement(_grommet.TableBody, null, DATA.map(function (datum) {
    return _react.default.createElement(_grommet.TableRow, {
      key: datum.id
    }, COLUMNS.map(function (c) {
      return _react.default.createElement(_grommet.TableCell, {
        key: c.property,
        scope: c.dataScope,
        align: c.align
      }, _react.default.createElement(_grommet.Text, null, c.format ? c.format(datum) : datum[c.property]));
    }));
  })), _react.default.createElement(_grommet.TableFooter, null, _react.default.createElement(_grommet.TableRow, null, COLUMNS.map(function (c) {
    return _react.default.createElement(_grommet.TableCell, {
      key: c.property,
      align: c.align
    }, _react.default.createElement(_grommet.Text, null, c.footer));
  })))));
};

(0, _react2.storiesOf)('Table', module).add('Default', function () {
  return _react.default.createElement(DefaultTable, null);
}).add('Custom Theme', function () {
  return _react.default.createElement(CustomThemeTable, null);
});