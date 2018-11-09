import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { Chart, calcs } from '..';
var VALUES = [{
  value: [1, 60],
  label: 'sixty'
}, {
  value: [0, 0],
  label: 'zero'
}];
test('Chart renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Chart, {
    values: VALUES
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Chart type renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Chart, {
    type: "bar",
    values: VALUES
  }), React.createElement(Chart, {
    type: "line",
    values: VALUES
  }), React.createElement(Chart, {
    type: "area",
    values: VALUES
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Chart size renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Chart, {
    size: "xsmall",
    values: VALUES
  }), React.createElement(Chart, {
    size: "small",
    values: VALUES
  }), React.createElement(Chart, {
    size: "medium",
    values: VALUES
  }), React.createElement(Chart, {
    size: "large",
    values: VALUES
  }), React.createElement(Chart, {
    size: "xlarge",
    values: VALUES
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Chart thickness renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Chart, {
    thickness: "xsmall",
    values: VALUES
  }), React.createElement(Chart, {
    thickness: "small",
    values: VALUES
  }), React.createElement(Chart, {
    thickness: "medium",
    values: VALUES
  }), React.createElement(Chart, {
    thickness: "large",
    values: VALUES
  }), React.createElement(Chart, {
    thickness: "xlarge",
    values: VALUES
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Chart cap renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Chart, {
    round: true,
    values: VALUES
  }), React.createElement(Chart, {
    type: "line",
    round: true,
    values: VALUES
  }), React.createElement(Chart, {
    type: "area",
    round: true,
    values: VALUES
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Chart calcs', function () {
  var result = calcs([1, 2, 3]);
  expect(result).toMatchSnapshot();
});