import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { Image } from '..';
var opacityTypes = ['weak', 'medium', 'strong', '0.3', true, false];
var SRC = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABGdBTUEAALGPC/xhBQAAAA1JREFUCB1jYGBg+A8AAQQBAB5znEAAAAAASUVORK5CYII='; // eslint-disable-line max-len

test('Image renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Image, {
    src: SRC
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Image renders with aria-label', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Image, {
    a11yTitle: "aria-label-text",
    src: SRC
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Image fit renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Image, {
    fit: "cover",
    src: SRC
  }), /*#__PURE__*/React.createElement(Image, {
    fit: "contain",
    src: SRC
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
opacityTypes.forEach(function (opacity) {
  test("Image opacity of " + opacity + " renders", function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Image, {
      opacity: opacity,
      src: SRC
    })));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
test('Image fillProp renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Image, {
    fill: true,
    src: SRC
  }), /*#__PURE__*/React.createElement(Image, {
    fill: false,
    src: SRC
  }), /*#__PURE__*/React.createElement(Image, {
    fill: "horizontal",
    src: SRC
  }), /*#__PURE__*/React.createElement(Image, {
    fill: "vertical",
    src: SRC
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});