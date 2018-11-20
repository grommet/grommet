"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('RangeInput renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.RangeInput, {
    value: "50"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});