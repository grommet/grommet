"use strict";

var _react = _interopRequireDefault(require("react"));

require("jest-styled-components");

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _reactTestingLibrary = require("react-testing-library");

var _ = require("../..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Accordion', function () {
  afterEach(_reactTestingLibrary.cleanup);
  test('no AccordionPanel', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Accordion, null)));

    expect(component.toJSON()).toMatchSnapshot();
  });
  test('AccordionPanel', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Accordion, null, _react.default.createElement(_.AccordionPanel, {
      label: "Panel 1"
    }, "Panel body 1"), _react.default.createElement(_.AccordionPanel, {
      label: "Panel 2"
    }, "Panel body 2"), false && _react.default.createElement(_.AccordionPanel, {
      label: "Panel 2"
    }, "Panel body 2"))));

    expect(component.toJSON()).toMatchSnapshot();
  });
  test('complex title', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Box, {
      background: "dark-1"
    }, _react.default.createElement(_.Accordion, null, _react.default.createElement(_.AccordionPanel, {
      label: _react.default.createElement("div", null, "Panel 1 complex")
    }, "Panel body 1"), undefined, _react.default.createElement(_.AccordionPanel, {
      label: _react.default.createElement("div", null, "Panel 2 complex")
    }, "Panel body 2")))));

    expect(component.toJSON()).toMatchSnapshot();
  });
  test('complex header', function () {
    var component = _reactTestRenderer.default.create(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Accordion, {
      activeIndex: 1,
      animate: false
    }, _react.default.createElement(_.AccordionPanel, {
      header: _react.default.createElement("div", null, "Panel 1 header")
    }, "Panel body 1"), undefined, _react.default.createElement(_.AccordionPanel, {
      header: _react.default.createElement("div", null, "Panel 2 header")
    }, "Panel body 2"))));

    expect(component.toJSON()).toMatchSnapshot();
  });
  test('change to second Panel', function (done) {
    var onActive = jest.fn();

    var _render = (0, _reactTestingLibrary.render)(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Accordion, {
      onActive: onActive
    }, _react.default.createElement(_.AccordionPanel, {
      label: "Panel 1"
    }, "Panel body 1"), _react.default.createElement(_.AccordionPanel, {
      label: "Panel 2"
    }, "Panel body 2")))),
        getByText = _render.getByText,
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.click(getByText('Panel 2')); // wait for panel animation to finish


    setTimeout(function () {
      expect(onActive).toBeCalled();
      expect(container.firstChild).toMatchSnapshot();
      done();
    }, 500);
  });
  test('change to second Panel without onActive', function () {
    var _render2 = (0, _reactTestingLibrary.render)(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Accordion, {
      animate: false
    }, _react.default.createElement(_.AccordionPanel, {
      label: "Panel 1"
    }, "Panel body 1"), _react.default.createElement(_.AccordionPanel, {
      label: "Panel 2"
    }, "Panel body 2")))),
        getByText = _render2.getByText,
        container = _render2.container;

    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.click(getByText('Panel 2'));

    expect(container.firstChild).toMatchSnapshot();
  });
  test('multiple panels', function () {
    var onActive = jest.fn();

    var _render3 = (0, _reactTestingLibrary.render)(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Accordion, {
      animate: false,
      multiple: true,
      onActive: onActive
    }, _react.default.createElement(_.AccordionPanel, {
      label: "Panel 1"
    }, "Panel body 1"), _react.default.createElement(_.AccordionPanel, {
      label: "Panel 2"
    }, "Panel body 2")))),
        getByText = _render3.getByText,
        container = _render3.container;

    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.click(getByText('Panel 2'));

    expect(onActive).toBeCalledWith([1]);
    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.click(getByText('Panel 1'));

    expect(onActive).toBeCalledWith([1, 0]);
    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.click(getByText('Panel 2'));

    expect(onActive).toBeCalledWith([0]);
    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.click(getByText('Panel 1'));

    expect(onActive).toBeCalledWith([]);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('change active index', function () {
    var onActive = jest.fn();

    var _render4 = (0, _reactTestingLibrary.render)(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Accordion, {
      animate: false,
      activeIndex: 1,
      onActive: onActive
    }, _react.default.createElement(_.AccordionPanel, {
      label: "Panel 1"
    }, "Panel body 1"), _react.default.createElement(_.AccordionPanel, {
      label: "Panel 2"
    }, "Panel body 2")))),
        getByText = _render4.getByText,
        container = _render4.container;

    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.click(getByText('Panel 1'));

    expect(onActive).toBeCalledWith([0]);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('set on hover', function () {
    var _render5 = (0, _reactTestingLibrary.render)(_react.default.createElement(_.Grommet, null, _react.default.createElement(_.Accordion, null, _react.default.createElement(_.AccordionPanel, {
      label: "Panel 1",
      onMouseOver: function onMouseOver() {},
      onMouseOut: function onMouseOut() {},
      onFocus: function onFocus() {},
      onBlur: function onBlur() {}
    }, "Panel body 1"), _react.default.createElement(_.AccordionPanel, {
      label: "Panel 2",
      onMouseOver: function onMouseOver() {},
      onMouseOut: function onMouseOut() {},
      onFocus: function onFocus() {},
      onBlur: function onBlur() {}
    }, "Panel body 2")))),
        getByText = _render5.getByText,
        container = _render5.container;

    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.mouseOver(getByText('Panel 1'));

    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.mouseOver(getByText('Panel 2'));

    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.mouseOut(getByText('Panel 1'));

    expect(container.firstChild).toMatchSnapshot();

    _reactTestingLibrary.fireEvent.mouseOut(getByText('Panel 2'));

    expect(container.firstChild).toMatchSnapshot();
  });
});