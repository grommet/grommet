"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('CheckBox renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.CheckBox, null), _react.default.createElement(_.CheckBox, {
    id: "test id",
    name: "test name"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('CheckBox label renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.CheckBox, {
    label: "test label"
  }), _react.default.createElement(_.CheckBox, {
    label: _react.default.createElement("div", null, "test label")
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('CheckBox checked renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.CheckBox, {
    checked: true
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('CheckBox disabled renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.CheckBox, {
    disabled: true
  }), _react.default.createElement(_.CheckBox, {
    disabled: true,
    checked: true
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('CheckBox reverse renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.CheckBox, {
    reverse: true,
    label: "test label"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('CheckBox toggle renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.CheckBox, {
    toggle: true
  }), _react.default.createElement(_.CheckBox, {
    toggle: true,
    checked: true
  }), _react.default.createElement(_.CheckBox, {
    toggle: true,
    label: "test label"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});