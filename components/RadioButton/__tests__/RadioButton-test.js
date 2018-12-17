"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('RadioButton renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.RadioButton, {
    name: "test empty"
  }), _react.default.createElement(_.RadioButton, {
    id: "test id",
    name: "test name"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('RadioButton label renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.RadioButton, {
    label: "test label",
    name: "test label"
  }), _react.default.createElement(_.RadioButton, {
    label: _react.default.createElement("div", null, "test label"),
    name: "test div label"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('RadioButton checked renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.RadioButton, {
    checked: true,
    name: "test checked"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('RadioButton disabled renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.RadioButton, {
    disabled: true,
    name: "test disabled"
  }), _react.default.createElement(_.RadioButton, {
    disabled: true,
    checked: true,
    name: "test checked disabled"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});