import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { Keyboard } from '..';
test('Keyboard renders', function () {
  var onDown = jest.fn();
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Keyboard, {
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
test('Keyboard calls onKeyDown', function () {
  var onDown = jest.fn();
  var onKeyDown = jest.fn();
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Keyboard, {
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