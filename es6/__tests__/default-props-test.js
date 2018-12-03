import React from 'react';
import renderer from 'react-test-renderer';
import styled from 'styled-components';
import 'jest-styled-components';
import { grommet, defaultProps, extendDefaultTheme, Box, Grommet } from '..';
var CustomBox = styled.div.withConfig({
  displayName: "default-props-test__CustomBox",
  componentId: "sc-9t2l2e-0"
})(["background:", ";"], function (props) {
  return props.theme.global.colors.brand;
});
CustomBox.defaultProps = {};
Object.setPrototypeOf(CustomBox.defaultProps, defaultProps);
test('default theme is used', function () {
  var component = renderer.create(React.createElement(Box, {
    background: "brand"
  }));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('extends default theme', function () {
  extendDefaultTheme({
    global: {
      colors: {
        brand: 'red'
      }
    }
  });
  var component = renderer.create(React.createElement(Box, {
    background: "brand"
  }));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('extends default theme twice', function () {
  extendDefaultTheme({
    global: {
      colors: {
        brand: 'red'
      }
    }
  });
  var component = renderer.create(React.createElement(Box, {
    background: "brand"
  }));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  extendDefaultTheme({
    global: {
      colors: {
        brand: 'blue'
      }
    }
  });
  component = renderer.create(React.createElement(Box, {
    background: "brand"
  }));
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('uses Grommet theme instead of default', function () {
  extendDefaultTheme({
    global: {
      colors: {
        brand: 'red'
      }
    }
  });
  var component = renderer.create(React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    background: "brand"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('leverages default theme', function () {
  extendDefaultTheme({
    global: {
      colors: {
        brand: 'red'
      }
    }
  });
  var component = renderer.create(React.createElement(CustomBox, null));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});