import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { findAllByType } from '../../../utils';
import { Grommet } from '../../Grommet';
import { Anchor } from '..';
test('Anchor renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Anchor, null)));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Anchor renders with children', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Anchor, {
    href: "#"
  }, "children")));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Anchor warns about invalid label render', function () {
  var warnSpy = jest.spyOn(console, 'warn');
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Anchor, {
    href: "#",
    label: "Test"
  }, "invalid")));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(warnSpy).toHaveBeenCalledWith('Anchor should not have children if icon or label is provided');
  warnSpy.mockReset();
  warnSpy.mockRestore();
});
test('Anchor warns about invalid icon render', function () {
  var warnSpy = jest.spyOn(console, 'warn');
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Anchor, {
    href: "#",
    icon: React.createElement("svg", null)
  }, "invalid")));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  expect(warnSpy).toHaveBeenCalledWith('Anchor should not have children if icon or label is provided');
  warnSpy.mockReset();
  warnSpy.mockRestore();
});
test('Anchor primary renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Anchor, {
    href: "#",
    primary: true,
    label: "Test"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Anchor focus renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Anchor, {
    href: "#",
    focus: true,
    label: "Test"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Anchor disabled renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Anchor, {
    disabled: true
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Anchor icon label renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Anchor, {
    icon: React.createElement("svg", null),
    label: "Test",
    onClick: function onClick() {}
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Anchor reverse icon label renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Anchor, {
    reverse: true,
    icon: React.createElement("svg", null),
    label: "Test",
    onClick: function onClick() {}
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Anchor is clickable', function () {
  var onClick = jest.fn();
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Anchor, {
    href: "#",
    label: "Test",
    onClick: onClick
  })));
  var tree = component.toJSON();
  var anchor = findAllByType(tree, 'a');
  anchor[0].props.onClick();
  expect(onClick).toBeCalled();
});