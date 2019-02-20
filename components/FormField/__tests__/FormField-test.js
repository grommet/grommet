"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

require("jest-styled-components");

var _Grommet = require("../../Grommet");

var _ = require("..");

var _TextInput = require("../../TextInput");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CustomFormField = (0, _styledComponents.default)(_.FormField).withConfig({
  displayName: "FormField-test__CustomFormField",
  componentId: "sc-1ddfx0c-0"
})(["font-size:40px;"]);
test('renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.FormField, null), _react.default.createElement(_.FormField, null, _react.default.createElement(_TextInput.TextInput, null))));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders label', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.FormField, {
    label: "test label"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders help', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.FormField, {
    help: "test help"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders error', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.FormField, {
    error: "test error"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders htmlFor', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.FormField, {
    htmlFor: "test-id"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders custom formfield', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(CustomFormField, {
    htmlFor: "test-id"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});