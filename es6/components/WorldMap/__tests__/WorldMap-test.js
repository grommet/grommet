import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { WorldMap } from '..';
test('WorldMap renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(WorldMap, null)));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('WorldMap color renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(WorldMap, {
    color: "brand"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('WorldMap continents renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(WorldMap, {
    continents: [{
      name: 'Africa',
      color: 'accent-1',
      onClick: function onClick() {}
    }]
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('WorldMap places renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(WorldMap, {
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
test('WorldMap onSelectPlace renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(WorldMap, {
    onSelectPlace: function onSelectPlace() {}
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});