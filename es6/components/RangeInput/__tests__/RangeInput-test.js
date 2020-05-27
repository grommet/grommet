import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { RangeInput } from '..';
test('RangeInput renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(RangeInput, {
    value: "50"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('RangeInput track themed', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, {
    theme: {
      rangeInput: {
        track: {
          color: 'brand'
        }
      }
    }
  }, /*#__PURE__*/React.createElement(RangeInput, {
    value: "10"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('RangeInput track themed with color and opacity', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, {
    theme: {
      rangeInput: {
        track: {
          color: 'brand',
          opacity: 0.3
        }
      }
    }
  }, /*#__PURE__*/React.createElement(RangeInput, {
    value: "10"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('with min and max offset', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(RangeInput, {
    min: 10,
    max: 20,
    step: 1,
    value: 15
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});