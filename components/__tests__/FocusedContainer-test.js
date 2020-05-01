"use strict";

var _react = _interopRequireDefault(require("react"));

require("jest-styled-components");

var _react2 = require("@testing-library/react");

var _FocusedContainer = require("../FocusedContainer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('FocusedContainer', function () {
  afterEach(_react2.cleanup);
  test('basic', function () {
    jest.useFakeTimers();

    var _render = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement("div", {
      id: "focus-trap-test"
    }, /*#__PURE__*/_react["default"].createElement("input", {
      id: "test"
    }))),
        trapped = _render.container;

    var _render2 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_FocusedContainer.FocusedContainer, {
      id: "container"
    }, "test focused container")),
        focuser = _render2.container;

    jest.runAllTimers();
    expect(focuser.firstChild).toMatchSnapshot();
    expect(trapped.firstChild).toMatchSnapshot(); // should have tabIndex="-1"

    document.getElementById('test').focus();
    expect(trapped.firstChild).toMatchSnapshot();
  });
  test('restrict scroll', function () {
    jest.useFakeTimers();

    var _render3 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_FocusedContainer.FocusedContainer, {
      id: "container",
      restrictScroll: true
    }, "test focused container")),
        container = _render3.container;

    jest.runAllTimers();
    expect(container.firstChild).toMatchSnapshot();
    expect(document.body.style.overflow).toMatchSnapshot();
    (0, _react2.cleanup)();
    expect(document.body.style.overflow).toMatchSnapshot();
  });
  test('blurs', function () {
    jest.useFakeTimers();

    var _render4 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement("div", {
      id: "focus-trap-test"
    }, /*#__PURE__*/_react["default"].createElement("input", {
      id: "test"
    }))),
        trapped = _render4.container;

    var _render5 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_FocusedContainer.FocusedContainer, {
      id: "container"
    }, "test focused container")),
        focuser = _render5.container;

    jest.runAllTimers();
    expect(focuser.firstChild).toMatchSnapshot();
    expect(trapped.firstChild).toMatchSnapshot(); // should have tabIndex="-1"

    _react2.fireEvent.blur(focuser);

    expect(trapped.firstChild).toMatchSnapshot();
  });
});