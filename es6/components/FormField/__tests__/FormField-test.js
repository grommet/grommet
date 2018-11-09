import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { FormField } from '..';
import { TextInput } from '../../TextInput';
test('renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(FormField, null), React.createElement(FormField, null, React.createElement(TextInput, null))));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders label', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(FormField, {
    label: "test label"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders help', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(FormField, {
    help: "test help"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders error', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(FormField, {
    error: "test error"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders htmlFor', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(FormField, {
    htmlFor: "test-id"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});