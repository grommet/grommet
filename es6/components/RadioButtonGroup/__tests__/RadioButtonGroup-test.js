import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { RadioButtonGroup } from '..';
describe('RadioButtonGroup', function () {
  test('default', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(RadioButtonGroup, {
      name: "test",
      options: []
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('string options', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(RadioButtonGroup, {
      name: "test",
      options: ['one', 'two'],
      value: "one"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('object options just value', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(RadioButtonGroup, {
      name: "test",
      options: [{
        value: 'one'
      }, {
        value: 'two'
      }],
      value: "two"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('object options', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(RadioButtonGroup, {
      name: "test",
      options: [{
        id: 'onE',
        label: 'One',
        value: 'one'
      }, {
        id: 'twO',
        label: 'Two',
        value: 'two'
      }]
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('object options disabled', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(RadioButtonGroup, {
      name: "test",
      options: [{
        value: 'one',
        disabled: true
      }, {
        value: 'two'
      }]
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});