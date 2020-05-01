import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { Box } from '../../Box';
import { RadioButtonGroup } from '..';
describe('RadioButtonGroup', function () {
  test('default', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(RadioButtonGroup, {
      name: "test",
      options: []
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('string options', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(RadioButtonGroup, {
      name: "test",
      options: ['one', 'two'],
      value: "one"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('object options just value', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(RadioButtonGroup, {
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
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(RadioButtonGroup, {
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
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(RadioButtonGroup, {
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
  test('children', function () {
    var child = function child(_ref) {
      var checked = _ref.checked;
      return /*#__PURE__*/React.createElement(Box, {
        pad: "small",
        background: checked ? 'accent-1' : 'control'
      });
    };

    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(RadioButtonGroup, {
      name: "test",
      options: ['one', 'two'],
      value: "one"
    }, child)));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('adding additional props', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(RadioButtonGroup, {
      name: "test",
      options: [{
        id: 'ONE',
        value: '1',
        'data-testid': 'testid-1'
      }, {
        id: 'TWO',
        value: '2',
        'data-testid': 'testid-2'
      }]
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});