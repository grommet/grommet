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
describe('Stack', function () {
  test('default', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Stack, null, CONTENTS)));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('guidingChild', function () {
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
  test('anchor', function () {
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
  test('fill', function () {
    var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Stack, {
      fill: true
    }, CONTENTS), /*#__PURE__*/React.createElement(Stack, {
      fill: false
    }, CONTENTS), /*#__PURE__*/React.createElement(Stack, {
      fill: "horizontal"
    }, CONTENTS), /*#__PURE__*/React.createElement(Stack, {
      fill: "vertical"
    }, CONTENTS)));
    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('interactiveChild', function () {
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
});