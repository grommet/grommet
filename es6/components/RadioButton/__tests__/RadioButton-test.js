import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { RadioButton } from '..';
test('RadioButton renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(RadioButton, null), React.createElement(RadioButton, {
    id: "test id",
    name: "test name"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('RadioButton label renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(RadioButton, {
    label: "test label"
  }), React.createElement(RadioButton, {
    label: React.createElement("div", null, "test label")
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('RadioButton checked renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(RadioButton, {
    checked: true
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('RadioButton disabled renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(RadioButton, {
    disabled: true
  }), React.createElement(RadioButton, {
    disabled: true,
    checked: true
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});