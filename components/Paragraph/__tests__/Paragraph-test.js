"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

test('Paragraph renders', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Paragraph, null)));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Paragraph size renders', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Paragraph, {
    size: "small"
  }), /*#__PURE__*/_react["default"].createElement(_.Paragraph, {
    size: "medium"
  }), /*#__PURE__*/_react["default"].createElement(_.Paragraph, {
    size: "large"
  }), /*#__PURE__*/_react["default"].createElement(_.Paragraph, {
    size: "xlarge"
  }), /*#__PURE__*/_react["default"].createElement(_.Paragraph, {
    size: "xxlarge"
  }), /*#__PURE__*/_react["default"].createElement(_.Paragraph, {
    fill: true
  }), /*#__PURE__*/_react["default"].createElement(_.Paragraph, {
    fill: false
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Paragraph margin renders', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Paragraph, {
    margin: "small"
  }), /*#__PURE__*/_react["default"].createElement(_.Paragraph, {
    margin: "medium"
  }), /*#__PURE__*/_react["default"].createElement(_.Paragraph, {
    margin: "large"
  }), /*#__PURE__*/_react["default"].createElement(_.Paragraph, {
    margin: "none"
  }), /*#__PURE__*/_react["default"].createElement(_.Paragraph, {
    margin: {
      bottom: 'small'
    }
  }), /*#__PURE__*/_react["default"].createElement(_.Paragraph, {
    margin: {
      top: 'small'
    }
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Paragraph textAlign renders', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Paragraph, {
    textAlign: "start"
  }), /*#__PURE__*/_react["default"].createElement(_.Paragraph, {
    textAlign: "center"
  }), /*#__PURE__*/_react["default"].createElement(_.Paragraph, {
    textAlign: "end"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});