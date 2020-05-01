"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CONTENTS = [/*#__PURE__*/_react["default"].createElement("div", {
  key: 1
}, "first"), /*#__PURE__*/_react["default"].createElement("div", {
  key: 2
}, "second")];
test('renders', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Stack, null, CONTENTS)));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('guidingChild renders', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Stack, {
    guidingChild: "first"
  }, CONTENTS), /*#__PURE__*/_react["default"].createElement(_.Stack, {
    guidingChild: "last"
  }, CONTENTS), /*#__PURE__*/_react["default"].createElement(_.Stack, {
    guidingChild: 0
  }, CONTENTS)));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('anchor renders', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Stack, {
    anchor: "center"
  }, CONTENTS), /*#__PURE__*/_react["default"].createElement(_.Stack, {
    anchor: "top"
  }, CONTENTS), /*#__PURE__*/_react["default"].createElement(_.Stack, {
    anchor: "left"
  }, CONTENTS), /*#__PURE__*/_react["default"].createElement(_.Stack, {
    anchor: "bottom"
  }, CONTENTS), /*#__PURE__*/_react["default"].createElement(_.Stack, {
    anchor: "right"
  }, CONTENTS), /*#__PURE__*/_react["default"].createElement(_.Stack, {
    anchor: "top-left"
  }, CONTENTS), /*#__PURE__*/_react["default"].createElement(_.Stack, {
    anchor: "bottom-left"
  }, CONTENTS), /*#__PURE__*/_react["default"].createElement(_.Stack, {
    anchor: "top-right"
  }, CONTENTS), /*#__PURE__*/_react["default"].createElement(_.Stack, {
    anchor: "bottom-right"
  }, CONTENTS)));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('fill renders', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Stack, {
    fill: true
  }, CONTENTS), /*#__PURE__*/_react["default"].createElement(_.Stack, {
    fill: false
  }, CONTENTS)));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('interactiveChild renders', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Stack, {
    interactiveChild: "first"
  }, CONTENTS), /*#__PURE__*/_react["default"].createElement(_.Stack, {
    interactiveChild: "last"
  }, CONTENTS), /*#__PURE__*/_react["default"].createElement(_.Stack, {
    interactiveChild: 0
  }, CONTENTS)));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});