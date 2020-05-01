import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react';
import { Grommet, Tab, Tabs } from '../..';
describe('Tabs', function () {
  test('no Tab', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Tabs, null, /*#__PURE__*/React.createElement(Tab, null))));
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('Tab', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Tabs, null, /*#__PURE__*/React.createElement(Tab, {
      title: "Tab 1"
    }, "Tab body 1"), undefined, /*#__PURE__*/React.createElement(Tab, {
      title: "Tab 2"
    }, "Tab body 2"))));
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('complex title', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Tabs, null, /*#__PURE__*/React.createElement(Tab, {
      title: /*#__PURE__*/React.createElement("div", null, "Tab 1")
    }, "Tab body 1"), undefined, /*#__PURE__*/React.createElement(Tab, {
      title: /*#__PURE__*/React.createElement("div", null, "Tab 2")
    }, "Tab body 2"))));
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('with icon + reverse', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Tabs, null, /*#__PURE__*/React.createElement(Tab, {
      title: "Tab 1",
      icon: /*#__PURE__*/React.createElement("svg", null)
    }, "Tab body 1"), /*#__PURE__*/React.createElement(Tab, {
      title: "Tab 2",
      icon: /*#__PURE__*/React.createElement("svg", null),
      reverse: true
    }, "Tab body 2"))));
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('change to second tab', function () {
    var onActive = jest.fn();

    var _render = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Tabs, {
      onActive: onActive
    }, /*#__PURE__*/React.createElement(Tab, {
      title: "Tab 1"
    }, "Tab body 1"), /*#__PURE__*/React.createElement(Tab, {
      title: "Tab 2"
    }, "Tab body 2")))),
        getByText = _render.getByText,
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.click(getByText('Tab 2'));
    expect(onActive).toBeCalledWith(1);
    expect(container.firstChild).toMatchSnapshot();
  });
  test('set on hover', function () {
    var _render2 = render( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Tabs, null, /*#__PURE__*/React.createElement(Tab, {
      title: "Tab 1",
      onMouseOver: function onMouseOver() {},
      onMouseOut: function onMouseOut() {}
    }, "Tab body 1"), /*#__PURE__*/React.createElement(Tab, {
      title: "Tab 2"
    }, "Tab body 2")))),
        getByText = _render2.getByText,
        container = _render2.container;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent.mouseOver(getByText('Tab 1'));
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.mouseOver(getByText('Tab 2'));
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.mouseOut(getByText('Tab 1'));
    expect(container.firstChild).toMatchSnapshot();
    fireEvent.mouseOut(getByText('Tab 2'));
    expect(container.firstChild).toMatchSnapshot();
  });
});