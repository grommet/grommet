import React from 'react';
import { create } from 'react-test-renderer';
import 'jest-styled-components';
import { render, fireEvent } from '@testing-library/react';
import { Grommet } from '../../Grommet';
import { Keyboard } from '..';
describe('Keyboard', function () {
  test('onDown', function () {
    var onDown = jest.fn();
    var component = create(React.createElement(Grommet, null, React.createElement(Keyboard, {
      onDown: onDown
    }, React.createElement("span", null, "hi"))));
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
  test('onKeyDown', function () {
    var onDown = jest.fn();
    var onKeyDown = jest.fn();
    var component = create(React.createElement(Grommet, null, React.createElement(Keyboard, {
      onDown: onDown,
      onKeyDown: onKeyDown
    }, React.createElement("span", null, "hi"))));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    tree.children[0].props.onKeyDown({
      keyCode: 40
    });
    expect(onDown).toBeCalled();
    expect(onKeyDown).toBeCalled();
  });
  test('change onKeyDown', function () {
    var firstOnKeyDown = jest.fn();
    var secondOnKeyDown = jest.fn();

    var _render = render(React.createElement(Keyboard, {
      target: "document",
      onKeyDown: firstOnKeyDown
    }, React.createElement("span", null, "hi"))),
        container = _render.container,
        getByText = _render.getByText,
        rerender = _render.rerender;

    expect(container.firstChild).toMatchSnapshot();
    fireEvent(getByText('hi'), new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true
    }));
    expect(firstOnKeyDown).toBeCalled();
    rerender(React.createElement(Keyboard, {
      target: "document",
      onKeyDown: secondOnKeyDown
    }, React.createElement("span", null, "hi")));
    expect(container.firstChild).toMatchSnapshot();
    fireEvent(getByText('hi'), new KeyboardEvent('keydown', {
      bubbles: true,
      cancelable: true
    }));
    expect(secondOnKeyDown).toBeCalled();
  });
});