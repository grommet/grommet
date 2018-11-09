"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VALUES = [{
  value: [1, 60],
  label: 'sixty'
}, {
  value: [0, 0],
  label: 'zero'
}];
test('Chart renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Chart, {
    values: VALUES
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Chart type renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Chart, {
    type: "bar",
    values: VALUES
  }), _react.default.createElement(_.Chart, {
    type: "line",
    values: VALUES
  }), _react.default.createElement(_.Chart, {
    type: "area",
    values: VALUES
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Chart size renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Chart, {
    size: "xsmall",
    values: VALUES
  }), _react.default.createElement(_.Chart, {
    size: "small",
    values: VALUES
  }), _react.default.createElement(_.Chart, {
    size: "medium",
    values: VALUES
  }), _react.default.createElement(_.Chart, {
    size: "large",
    values: VALUES
  }), _react.default.createElement(_.Chart, {
    size: "xlarge",
    values: VALUES
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Chart thickness renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Chart, {
    thickness: "xsmall",
    values: VALUES
  }), _react.default.createElement(_.Chart, {
    thickness: "small",
    values: VALUES
  }), _react.default.createElement(_.Chart, {
    thickness: "medium",
    values: VALUES
  }), _react.default.createElement(_.Chart, {
    thickness: "large",
    values: VALUES
  }), _react.default.createElement(_.Chart, {
    thickness: "xlarge",
    values: VALUES
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Chart cap renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Chart, {
    round: true,
    values: VALUES
  }), _react.default.createElement(_.Chart, {
    type: "line",
    round: true,
    values: VALUES
  }), _react.default.createElement(_.Chart, {
    type: "area",
    round: true,
    values: VALUES
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Chart calcs', function () {
  var result = (0, _.calcs)([1, 2, 3]);
  expect(result).toMatchSnapshot();
});