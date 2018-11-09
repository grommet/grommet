import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import { cleanup, render, fireEvent } from 'react-testing-library';
import { Accordion, AccordionPanel, Box, Grommet } from '../..';
describe('Accordion', function () {
  afterEach(cleanup);
  test('no AccordionPanel', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Accordion, null)));
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('AccordionPanel', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Accordion, null, React.createElement(AccordionPanel, {
      label: "Panel 1"
    }, "Panel body 1"), React.createElement(AccordionPanel, {
      label: "Panel 2"
    }, "Panel body 2"), false && React.createElement(AccordionPanel, {
      label: "Panel 2"
    }, "Panel body 2"))));
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('complex title', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Box, {
      background: "dark-1"
    }, React.createElement(Accordion, null, React.createElement(AccordionPanel, {
      label: React.createElement("div", null, "Panel 1 complex")
    }, "Panel body 1"), undefined, React.createElement(AccordionPanel, {
      label: React.createElement("div", null, "Panel 2 complex")
    }, "Panel body 2")))));
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('complex header', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Accordion, {
      activeIndex: 1,
      animate: false
    }, React.createElement(AccordionPanel, {
      header: React.createElement("div", null, "Panel 1 header")
    }, "Panel body 1"), undefined, React.createElement(AccordionPanel, {
      header: React.createElement("div", null, "Panel 2 header")
    }, "Panel body 2"))));
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('change to second Panel', function (done) {
    var onActive = jest.fn();

    var _render = render(React.createElement(Grommet, null, React.createElement(Accordion, {
      onActive: onActive
    }, React.createElement(AccordionPanel, {
      label: "Panel 1"
    }, "Panel body 1"), React.createElement(AccordionPanel, {
      label: "Panel 2"
    }, "Panel body 2")))),
        getByText = _render.getByText,
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Panel 2')); // wait for panel animation to finish

    setTimeout(function () {
      expect(onActive).toBeCalled();
      expect(container.firstChild).toMatchSnapshot();
      done();
    }, 500);
  });
  test('change to second Panel without onActive', function () {
    var _render2 = render(React.createElement(Grommet, null, React.createElement(Accordion, {
      animate: false
    }, React.createElement(AccordionPanel, {
      label: "Panel 1"
    }, "Panel body 1"), React.createElement(AccordionPanel, {
      label: "Panel 2"
    }, "Panel body 2")))),
        getByText = _render2.getByText,
        container = _render2.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Panel 2'));
    expect(container.firstChild).toMatchSnapshot();
  });
  test('multiple panels', function () {
    var onActive = jest.fn();

    var _render3 = render(React.createElement(Grommet, null, React.createElement(Accordion, {
      animate: false,
      multiple: true,
      onActive: onActive
    }, React.createElement(AccordionPanel, {
      label: "Panel 1"
    }, "Panel body 1"), React.createElement(AccordionPanel, {
      label: "Panel 2"
    }, "Panel body 2")))),
        getByText = _render3.getByText,
        container = _render3.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Panel 2'));
    expect(onActive).toBeCalledWith([1]);
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Panel 1'));
    expect(onActive).toBeCalledWith([1, 0]);
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Panel 2'));
    expect(onActive).toBeCalledWith([0]);
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Panel 1'));
    expect(onActive).toBeCalledWith([]);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('change active index', function () {
    var onActive = jest.fn();

    var _render4 = render(React.createElement(Grommet, null, React.createElement(Accordion, {
      animate: false,
      activeIndex: 1,
      onActive: onActive
    }, React.createElement(AccordionPanel, {
      label: "Panel 1"
    }, "Panel body 1"), React.createElement(AccordionPanel, {
      label: "Panel 2"
    }, "Panel body 2")))),
        getByText = _render4.getByText,
        container = _render4.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Panel 1'));
    expect(onActive).toBeCalledWith([0]);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('set on hover', function () {
    var _render5 = render(React.createElement(Grommet, null, React.createElement(Accordion, null, React.createElement(AccordionPanel, {
      label: "Panel 1",
      onMouseOver: function onMouseOver() {},
      onMouseOut: function onMouseOut() {},
      onFocus: function onFocus() {},
      onBlur: function onBlur() {}
    }, "Panel body 1"), React.createElement(AccordionPanel, {
      label: "Panel 2",
      onMouseOver: function onMouseOver() {},
      onMouseOut: function onMouseOut() {},
      onFocus: function onFocus() {},
      onBlur: function onBlur() {}
    }, "Panel body 2")))),
        getByText = _render5.getByText,
        container = _render5.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.mouseOver(getByText('Panel 1'));
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.mouseOver(getByText('Panel 2'));
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.mouseOut(getByText('Panel 1'));
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.mouseOut(getByText('Panel 2'));
    expect(container.firstChild).toMatchSnapshot();
  });
});