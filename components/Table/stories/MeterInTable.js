"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var values = [20, 40, 60, 80, 100];

var MeterInTable = function MeterInTable() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react.default.createElement(_grommet.Box, {
    border: true
  }, _react.default.createElement(_grommet.Table, {
    caption: "Meter Inside Table"
  }, _react.default.createElement(_grommet.TableBody, null, values.map(function (val) {
    return _react.default.createElement(_grommet.TableRow, null, _react.default.createElement(_grommet.TableCell, null, _react.default.createElement(_grommet.Meter, {
      type: "bar",
      values: [{
        value: val
      }]
    })), _react.default.createElement(_grommet.TableCell, null, _react.default.createElement(_grommet.Text, null, val, "% complete")));
  }))))));
};

(0, _react2.storiesOf)('Table', module).add('Meter Inside Table', function () {
  return _react.default.createElement(MeterInTable, null);
});