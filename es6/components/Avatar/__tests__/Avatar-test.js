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
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Avatar, null), /*#__PURE__*/React.createElement(Avatar, {
      id: "test id",
      name: "test name"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('size renders', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Avatar, {
      size: "xsmall",
      src: src
    }), /*#__PURE__*/React.createElement(Avatar, {
      size: "small",
      src: src
    }), /*#__PURE__*/React.createElement(Avatar, {
      src: src
    }), /*#__PURE__*/React.createElement(Avatar, {
      size: "large",
      src: src
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('round renders', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Avatar, {
      src: src,
      round: false
    }), /*#__PURE__*/React.createElement(Avatar, {
      src: src,
      round: "xsmall"
    }), /*#__PURE__*/React.createElement(Avatar, {
      src: src,
      round: "small"
    }), /*#__PURE__*/React.createElement(Avatar, {
      src: src,
      round: "medium"
    }), /*#__PURE__*/React.createElement(Avatar, {
      src: src,
      round: "large"
    }), /*#__PURE__*/React.createElement(Avatar, {
      src: src
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('text renders', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Avatar, {
      background: "dark-2"
    }, /*#__PURE__*/React.createElement(Text, {
      alignSelf: "center",
      size: "xlarge"
    }, "R")), /*#__PURE__*/React.createElement(Avatar, {
      background: "brand"
    }, /*#__PURE__*/React.createElement(Text, {
      alignSelf: "center",
      size: "xlarge"
    }, "SY"))));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('icon renders', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Avatar, {
      src: /*#__PURE__*/React.createElement(Favorite, {
        color: "accent-2"
      }),
      background: "accent-4"
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('stack renders', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Stack, {
      anchor: "bottom-right"
    }, /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Box, {
      direction: "row"
    }, /*#__PURE__*/React.createElement(Avatar, {
      size: "xsmall",
      src: src
    }), /*#__PURE__*/React.createElement(Box, {
      pad: "xxsmall"
    })), /*#__PURE__*/React.createElement(Box, {
      pad: "xxsmall"
    })), /*#__PURE__*/React.createElement(Avatar, {
      src: src,
      size: "42px"
    }))));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});