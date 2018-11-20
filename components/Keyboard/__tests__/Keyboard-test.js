"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('Keyboard renders', function () {
  var onDown = jest.fn();

  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Keyboard, {
    onDown: onDown
  }, _react.default.createElement("span", null, "hi"))));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  tree.children[0].props.onKeyDown({
    keyCode: 40
  });
  tree.children[0].props.onKeyDown({
    which: 40
  });
  tree.children[0].props.onKeyDown({
    which: 0
  });
  expect(onDown).toBeCalled();
});
test('Keyboard calls onKeyDown', function () {
  var onDown = jest.fn();
  var onKeyDown = jest.fn();

  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Keyboard, {
    onDown: onDown,
    onKeyDown: onKeyDown
  }, _react.default.createElement("span", null, "hi"))));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  tree.children[0].props.onKeyDown({
    keyCode: 40
  });
  expect(onDown).toBeCalled();
  expect(onKeyDown).toBeCalled();
});