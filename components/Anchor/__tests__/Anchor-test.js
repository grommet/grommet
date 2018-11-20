"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _utils = require("../../../utils");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('Anchor renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Anchor, null)));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Anchor renders with children', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Anchor, {
    href: "#"
  }, "children")));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Anchor warns about invalid label render', function () {
  var warnSpy = jest.spyOn(console, 'warn');

  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Anchor, {
    href: "#",
    label: "Test"
  }, "invalid")));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(warnSpy).toHaveBeenCalledWith('Anchor should not have children if icon or label is provided');
  warnSpy.mockReset();
  warnSpy.mockRestore();
});
test('Anchor warns about invalid icon render', function () {
  var warnSpy = jest.spyOn(console, 'warn');

  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Anchor, {
    href: "#",
    icon: _react.default.createElement("svg", null)
  }, "invalid")));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(warnSpy).toHaveBeenCalledWith('Anchor should not have children if icon or label is provided');
  warnSpy.mockReset();
  warnSpy.mockRestore();
});
test('Anchor primary renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Anchor, {
    href: "#",
    primary: true,
    label: "Test"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Anchor focus renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Anchor, {
    href: "#",
    focus: true,
    label: "Test"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Anchor disabled renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Anchor, {
    disabled: true
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Anchor icon label renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Anchor, {
    icon: _react.default.createElement("svg", null),
    label: "Test",
    onClick: function onClick() {}
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Anchor reverse icon label renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Anchor, {
    reverse: true,
    icon: _react.default.createElement("svg", null),
    label: "Test",
    onClick: function onClick() {}
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Anchor is clickable', function () {
  var onClick = jest.fn();

  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Anchor, {
    href: "#",
    label: "Test",
    onClick: onClick
  })));

  var tree = component.toJSON();
  var anchor = (0, _utils.findAllByType)(tree, 'a');
  anchor[0].props.onClick();
  expect(onClick).toBeCalled();
});