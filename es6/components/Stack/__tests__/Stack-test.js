import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { Stack } from '..';
var CONTENTS = [React.createElement("div", {
  key: 1
}, "first"), React.createElement("div", {
  key: 2
}, "second")];
test('renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Stack, null, CONTENTS)));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('guidingChild renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Stack, {
    guidingChild: "first"
  }, CONTENTS), React.createElement(Stack, {
    guidingChild: "last"
  }, CONTENTS), React.createElement(Stack, {
    guidingChild: 0
  }, CONTENTS)));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('anchor renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Stack, {
    anchor: "center"
  }, CONTENTS), React.createElement(Stack, {
    anchor: "top"
  }, CONTENTS), React.createElement(Stack, {
    anchor: "left"
  }, CONTENTS), React.createElement(Stack, {
    anchor: "bottom"
  }, CONTENTS), React.createElement(Stack, {
    anchor: "right"
  }, CONTENTS), React.createElement(Stack, {
    anchor: "top-left"
  }, CONTENTS), React.createElement(Stack, {
    anchor: "bottom-left"
  }, CONTENTS), React.createElement(Stack, {
    anchor: "top-right"
  }, CONTENTS), React.createElement(Stack, {
    anchor: "bottom-right"
  }, CONTENTS)));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('fill renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Stack, {
    fill: true
  }, CONTENTS), React.createElement(Stack, {
    fill: false
  }, CONTENTS)));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});