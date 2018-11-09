"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

jest.mock('react-dom');
describe('TextArea', function () {
  test('basic', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.TextArea, {
      id: "item",
      name: "item"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('placeholder', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.TextArea, {
      id: "item",
      name: "item",
      placeholder: "placeholder"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('plain', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.TextArea, {
      id: "item",
      name: "item",
      plain: true
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('focusIndicator', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.TextArea, {
      id: "item",
      name: "item",
      focusIndicator: true
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('fill', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.TextArea, {
      id: "item",
      name: "item",
      fill: true
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});