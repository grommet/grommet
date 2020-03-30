import React from 'react';
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Favorite } from "grommet-icons/es6/icons/Favorite";
import { Box } from '../../Box';
import { Grommet } from '../../Grommet';
import { Stack } from '../../Stack';
import { Text } from '../../Text';
import { Avatar } from '..';
var src = '';
describe('Avatar', function () {
  afterEach(cleanup);
  test('renders', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Avatar, null), React.createElement(Avatar, {
      id: "test id",
      name: "test name"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('size renders', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Avatar, {
      size: "xsmall",
      src: src
    }), React.createElement(Avatar, {
      size: "small",
      src: src
    }), React.createElement(Avatar, {
      src: src
    }), React.createElement(Avatar, {
      size: "large",
      src: src
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('round renders', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Avatar, {
      src: src,
      round: false
    }), React.createElement(Avatar, {
      src: src,
      round: "xsmall"
    }), React.createElement(Avatar, {
      src: src,
      round: "small"
    }), React.createElement(Avatar, {
      src: src,
      round: "medium"
    }), React.createElement(Avatar, {
      src: src,
      round: "large"
    }), React.createElement(Avatar, {
      src: src
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('text renders', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Avatar, {
      background: "dark-2"
    }, React.createElement(Text, {
      alignSelf: "center",
      size: "xlarge"
    }, "R")), React.createElement(Avatar, {
      background: "brand"
    }, React.createElement(Text, {
      alignSelf: "center",
      size: "xlarge"
    }, "SY"))));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('icon renders', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Avatar, {
      src: React.createElement(Favorite, {
        color: "accent-2"
      }),
      background: "accent-4"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('stack renders', function () {
    var component = renderer.create(React.createElement(Grommet, null, React.createElement(Stack, {
      anchor: "bottom-right"
    }, React.createElement(Box, null, React.createElement(Box, {
      direction: "row"
    }, React.createElement(Avatar, {
      size: "xsmall",
      src: src
    }), React.createElement(Box, {
      pad: "xxsmall"
    })), React.createElement(Box, {
      pad: "xxsmall"
    })), React.createElement(Avatar, {
      src: src,
      size: "42px"
    }))));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});