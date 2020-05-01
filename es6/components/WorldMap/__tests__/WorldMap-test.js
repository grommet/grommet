import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { WorldMap } from '..';
describe('WorldMap', function () {
  test('default', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(WorldMap, null)));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('color', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(WorldMap, {
      color: "brand"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('continents', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(WorldMap, {
      continents: [{
        name: 'Africa',
        color: 'accent-1',
        onClick: function onClick() {}
      }]
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('places', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(WorldMap, {
      places: [{
        name: 'Sydney',
        location: [-33.8830555556, 151.216666667],
        color: 'accent-1',
        onClick: function onClick() {}
      }]
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('onSelectPlace', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(WorldMap, {
      onSelectPlace: function onSelectPlace() {}
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('fill', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(WorldMap, {
      fill: true
    }), /*#__PURE__*/React.createElement(WorldMap, {
      fill: false
    }), /*#__PURE__*/React.createElement(WorldMap, {
      fill: "horizontal"
    }), /*#__PURE__*/React.createElement(WorldMap, {
      fill: "vertical"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});