import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { Image } from '..';
var SRC = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAALGPC/xhBQAAAA1JREFUCB1jYGBg+A8AAQQBAB5znEAAAAAASUVORK5CYII=';
test('Image renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Image, {
    src: SRC
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Image fit renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Image, {
    fit: "cover",
    src: SRC
  }), React.createElement(Image, {
    fit: "contain",
    src: SRC
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});