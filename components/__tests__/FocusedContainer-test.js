"use strict";

var _react = _interopRequireDefault(require("react"));

require("jest-styled-components");

var _reactTestingLibrary = require("react-testing-library");

var _FocusedContainer = require("../FocusedContainer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('FocusedContainer', function () {
  afterEach(_reactTestingLibrary.cleanup);
  test('basic', function () {
    jest.useFakeTimers();

    var _render = (0, _reactTestingLibrary.render)(_react.default.createElement("div", {
      id: "focus-trap-test"
    }, _react.default.createElement("input", {
      id: "test"
    }))),
        trapped = _render.container;

    var _render2 = (0, _reactTestingLibrary.render)(_react.default.createElement(_FocusedContainer.FocusedContainer, {
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

    var _render3 = (0, _reactTestingLibrary.render)(_react.default.createElement(_FocusedContainer.FocusedContainer, {
      id: "container",
      restrictScroll: true
    }, "test focused container")),
        container = _render3.container;

    jest.runAllTimers();
    expect(container.firstChild).toMatchSnapshot();
    expect(document.body.style.overflow).toMatchSnapshot();
    (0, _reactTestingLibrary.cleanup)();
    expect(document.body.style.overflow).toMatchSnapshot();
  });
  test('blurs', function () {
    jest.useFakeTimers();

    var _render4 = (0, _reactTestingLibrary.render)(_react.default.createElement("div", {
      id: "focus-trap-test"
    }, _react.default.createElement("input", {
      id: "test"
    }))),
        trapped = _render4.container;

    var _render5 = (0, _reactTestingLibrary.render)(_react.default.createElement(_FocusedContainer.FocusedContainer, {
      id: "container"
    }, "test focused container")),
        focuser = _render5.container;

    jest.runAllTimers();
    expect(focuser.firstChild).toMatchSnapshot();
    expect(trapped.firstChild).toMatchSnapshot(); // should have tabIndex="-1"

    _reactTestingLibrary.fireEvent.blur(focuser);

    expect(trapped.firstChild).toMatchSnapshot();
  });
});