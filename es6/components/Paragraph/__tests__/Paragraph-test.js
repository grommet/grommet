import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { Paragraph } from '..';
test('Paragraph renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Paragraph, null)));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Paragraph size renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Paragraph, {
    size: "small"
  }), React.createElement(Paragraph, {
    size: "medium"
  }), React.createElement(Paragraph, {
    size: "large"
  }), React.createElement(Paragraph, {
    size: "xlarge"
  }), React.createElement(Paragraph, {
    size: "xxlarge"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Paragraph margin renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Paragraph, {
    margin: "small"
  }), React.createElement(Paragraph, {
    margin: "medium"
  }), React.createElement(Paragraph, {
    margin: "large"
  }), React.createElement(Paragraph, {
    margin: "none"
  }), React.createElement(Paragraph, {
    margin: {
      bottom: 'small'
    }
  }), React.createElement(Paragraph, {
    margin: {
      top: 'small'
    }
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Paragraph textAlign renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Paragraph, {
    textAlign: "start"
  }), React.createElement(Paragraph, {
    textAlign: "center"
  }), React.createElement(Paragraph, {
    textAlign: "end"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});