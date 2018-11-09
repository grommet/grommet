import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { hpe } from 'grommet-theme-hpe';
import { Add } from "grommet-icons/es6/icons/Add";
import { Grommet, Anchor, Box, Text } from '../../components';
import { dark } from '..';
var colors = ['accent-1', 'accent-2', 'accent-3', 'brand', 'dark-1', 'dark-2', 'dark-3', 'dark-4', 'dark-5', 'focus', 'light-1', 'light-2', 'light-3', 'light-4', 'light-5', 'neutral-1', 'neutral-2', 'neutral-3', 'status-critical', 'status-disabled', 'status-ok', 'status-unknown', 'status-warning'];
var customTheme = {
  global: {
    colors: {
      custom: '#cc6633'
    }
  }
};
describe('Grommet', function () {
  test('default theme', function () {
    var component = renderer.create(React.createElement(Grommet, null, colors.map(function (color) {
      return React.createElement(Box, {
        key: color,
        background: color
      }, React.createElement(Text, null, color));
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('dark theme', function () {
    var component = renderer.create(React.createElement(Grommet, {
      theme: dark
    }, colors.map(function (color) {
      return React.createElement(Box, {
        key: color,
        background: color
      }, React.createElement(Text, null, color));
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('hpe theme', function () {
    var component = renderer.create(React.createElement(Grommet, {
      theme: hpe
    }, colors.map(function (color) {
      return React.createElement(Box, {
        key: color,
        background: color
      }, React.createElement(Text, null, color));
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('custom theme', function () {
    var component = renderer.create(React.createElement(Grommet, {
      theme: customTheme
    }, React.createElement(Box, null, React.createElement(Anchor, {
      icon: React.createElement(Add, null),
      label: "Add"
    }), React.createElement(Anchor, {
      icon: React.createElement(Add, null),
      label: "Add",
      color: "custom"
    })), React.createElement(Box, {
      background: "dark-1"
    }, React.createElement(Anchor, {
      icon: React.createElement(Add, null),
      label: "Add"
    }), React.createElement(Anchor, {
      icon: React.createElement(Add, null),
      label: "Add",
      color: "custom"
    }))));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});