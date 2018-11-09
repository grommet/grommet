"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('Paragraph renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Paragraph, null)));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Paragraph size renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Paragraph, {
    size: "small"
  }), _react.default.createElement(_.Paragraph, {
    size: "medium"
  }), _react.default.createElement(_.Paragraph, {
    size: "large"
  }), _react.default.createElement(_.Paragraph, {
    size: "xlarge"
  }), _react.default.createElement(_.Paragraph, {
    size: "xxlarge"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Paragraph margin renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Paragraph, {
    margin: "small"
  }), _react.default.createElement(_.Paragraph, {
    margin: "medium"
  }), _react.default.createElement(_.Paragraph, {
    margin: "large"
  }), _react.default.createElement(_.Paragraph, {
    margin: "none"
  }), _react.default.createElement(_.Paragraph, {
    margin: {
      bottom: 'small'
    }
  }), _react.default.createElement(_.Paragraph, {
    margin: {
      top: 'small'
    }
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Paragraph textAlign renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Paragraph, {
    textAlign: "start"
  }), _react.default.createElement(_.Paragraph, {
    textAlign: "center"
  }), _react.default.createElement(_.Paragraph, {
    textAlign: "end"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});