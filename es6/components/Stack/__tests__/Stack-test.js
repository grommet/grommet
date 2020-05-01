import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { Stack } from '..';
var CONTENTS = [/*#__PURE__*/React.createElement("div", {
  key: 1
}, "first"), /*#__PURE__*/React.createElement("div", {
  key: 2
}, "second")];
test('renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Stack, null, CONTENTS)));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('guidingChild renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Stack, {
    guidingChild: "first"
  }, CONTENTS), /*#__PURE__*/React.createElement(Stack, {
    guidingChild: "last"
  }, CONTENTS), /*#__PURE__*/React.createElement(Stack, {
    guidingChild: 0
  }, CONTENTS)));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('anchor renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Stack, {
    anchor: "center"
  }, CONTENTS), /*#__PURE__*/React.createElement(Stack, {
    anchor: "top"
  }, CONTENTS), /*#__PURE__*/React.createElement(Stack, {
    anchor: "left"
  }, CONTENTS), /*#__PURE__*/React.createElement(Stack, {
    anchor: "bottom"
  }, CONTENTS), /*#__PURE__*/React.createElement(Stack, {
    anchor: "right"
  }, CONTENTS), /*#__PURE__*/React.createElement(Stack, {
    anchor: "top-left"
  }, CONTENTS), /*#__PURE__*/React.createElement(Stack, {
    anchor: "bottom-left"
  }, CONTENTS), /*#__PURE__*/React.createElement(Stack, {
    anchor: "top-right"
  }, CONTENTS), /*#__PURE__*/React.createElement(Stack, {
    anchor: "bottom-right"
  }, CONTENTS)));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('fill renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Stack, {
    fill: true
  }, CONTENTS), /*#__PURE__*/React.createElement(Stack, {
    fill: false
  }, CONTENTS)));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('interactiveChild renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Stack, {
    interactiveChild: "first"
  }, CONTENTS), /*#__PURE__*/React.createElement(Stack, {
    interactiveChild: "last"
  }, CONTENTS), /*#__PURE__*/React.createElement(Stack, {
    interactiveChild: 0
  }, CONTENTS)));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});