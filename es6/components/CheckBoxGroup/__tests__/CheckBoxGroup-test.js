import React from 'react';
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { Grommet } from '../../Grommet';
import { CheckBoxGroup } from '..';
describe('CheckBoxGroup', function () {
  afterEach(cleanup);
  test('options renders', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(CheckBoxGroup, {
      options: ['First', 'Second']
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('value renders', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(CheckBoxGroup, {
      value: ['First'],
      options: ['First', 'Second']
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('initial value renders', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(CheckBoxGroup, {
      value: ['Wuhan', 'Jerusalem'],
      options: [{
        label: 'Maui',
        value: 'Maui'
      }, {
        label: 'Jerusalem',
        value: 'Jerusalem'
      }, {
        label: 'Wuhan',
        value: 'Wuhan'
      }]
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('disabled renders', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(CheckBoxGroup, {
      disabled: true,
      options: ['First', 'Second']
    }), /*#__PURE__*/React.createElement(CheckBoxGroup, {
      options: [{
        label: 'First',
        disabled: true
      }]
    }), /*#__PURE__*/React.createElement(CheckBoxGroup, {
      options: [{
        label: 'First',
        disabled: true
      }]
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});