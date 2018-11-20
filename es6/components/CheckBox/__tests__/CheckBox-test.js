import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { CheckBox } from '..';
test('CheckBox renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(CheckBox, null), React.createElement(CheckBox, {
    id: "test id",
    name: "test name"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('CheckBox label renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(CheckBox, {
    label: "test label"
  }), React.createElement(CheckBox, {
    label: React.createElement("div", null, "test label")
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('CheckBox checked renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(CheckBox, {
    checked: true
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('CheckBox disabled renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(CheckBox, {
    disabled: true
  }), React.createElement(CheckBox, {
    disabled: true,
    checked: true
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('CheckBox reverse renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(CheckBox, {
    reverse: true,
    label: "test label"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('CheckBox toggle renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(CheckBox, {
    toggle: true
  }), React.createElement(CheckBox, {
    toggle: true,
    checked: true
  }), React.createElement(CheckBox, {
    toggle: true,
    label: "test label"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});