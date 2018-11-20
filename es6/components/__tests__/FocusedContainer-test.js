import React from 'react';
import 'jest-styled-components';
import { cleanup, render, fireEvent } from 'react-testing-library';
import { FocusedContainer } from '../FocusedContainer';
describe('FocusedContainer', function () {
  afterEach(cleanup);
  test('basic', function () {
    jest.useFakeTimers();

    var _render = render(React.createElement("div", {
      id: "focus-trap-test"
    }, React.createElement("input", {
      id: "test"
    }))),
        trapped = _render.container;

    var _render2 = render(React.createElement(FocusedContainer, {
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

    var _render3 = render(React.createElement(FocusedContainer, {
      id: "container",
      restrictScroll: true
    }, "test focused container")),
        container = _render3.container;

    jest.runAllTimers();
    expect(container.firstChild).toMatchSnapshot();
    expect(document.body.style.overflow).toMatchSnapshot();
    cleanup();
    expect(document.body.style.overflow).toMatchSnapshot();
  });
  test('blurs', function () {
    jest.useFakeTimers();

    var _render4 = render(React.createElement("div", {
      id: "focus-trap-test"
    }, React.createElement("input", {
      id: "test"
    }))),
        trapped = _render4.container;

    var _render5 = render(React.createElement(FocusedContainer, {
      id: "container"
    }, "test focused container")),
        focuser = _render5.container;

    jest.runAllTimers();
    expect(focuser.firstChild).toMatchSnapshot();
    expect(trapped.firstChild).toMatchSnapshot(); // should have tabIndex="-1"

    fireEvent.blur(focuser);
    expect(trapped.firstChild).toMatchSnapshot();
  });
});