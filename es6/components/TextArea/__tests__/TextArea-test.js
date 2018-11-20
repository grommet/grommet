import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { TextArea } from '..';
jest.mock('react-dom');
describe('TextArea', function () {
  test('basic', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(TextArea, {
      id: "item",
      name: "item"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('placeholder', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(TextArea, {
      id: "item",
      name: "item",
      placeholder: "placeholder"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('plain', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(TextArea, {
      id: "item",
      name: "item",
      plain: true
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('focusIndicator', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(TextArea, {
      id: "item",
      name: "item",
      focusIndicator: true
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('fill', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(TextArea, {
      id: "item",
      name: "item",
      fill: true
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});