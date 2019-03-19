"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _data = require("./data");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  return _react.default.createElement(_grommet.Grommet, {
    theme: customTheme
  }, _react.default.createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react.default.createElement(_grommet.Text, {
    margin: {
      vertical: 'medium'
    }
  }, "this Table is using a Custom theme"), _react.default.createElement(_grommet.Table, {
    caption: "Custom Theme Table"
  }, _react.default.createElement(_grommet.TableHeader, null, _react.default.createElement(_grommet.TableRow, null, _data.columns.map(function (c) {
    return _react.default.createElement(_grommet.TableCell, {
      key: c.property,
      scope: "col",
      align: c.align
    }, _react.default.createElement(_grommet.Text, null, c.label));
  }))), _react.default.createElement(_grommet.TableBody, null, _data.data.map(function (datum) {
    return _react.default.createElement(_grommet.TableRow, {
      key: datum.id
    }, _data.columns.map(function (c) {
      return _react.default.createElement(_grommet.TableCell, {
        key: c.property,
        scope: c.dataScope,
        align: c.align
      }, _react.default.createElement(_grommet.Text, null, c.format ? c.format(datum) : datum[c.property]));
    }));
  })), _react.default.createElement(_grommet.TableFooter, null, _react.default.createElement(_grommet.TableRow, null, _data.columns.map(function (c) {
    return _react.default.createElement(_grommet.TableCell, {
      key: c.property,
      align: c.align
    }, _react.default.createElement(_grommet.Text, null, c.footer));
  }))))));
};

(0, _react2.storiesOf)('Table', module).add('Custom', function () {
  return _react.default.createElement(CustomThemeTable, null);
});