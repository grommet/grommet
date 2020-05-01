import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { Paragraph } from '..';
test('Paragraph renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Paragraph, null)));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Paragraph size renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Paragraph, {
    size: "small"
  }), /*#__PURE__*/React.createElement(Paragraph, {
    size: "medium"
  }), /*#__PURE__*/React.createElement(Paragraph, {
    size: "large"
  }), /*#__PURE__*/React.createElement(Paragraph, {
    size: "xlarge"
  }), /*#__PURE__*/React.createElement(Paragraph, {
    size: "xxlarge"
  }), /*#__PURE__*/React.createElement(Paragraph, {
    fill: true
  }), /*#__PURE__*/React.createElement(Paragraph, {
    fill: false
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Paragraph margin renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Paragraph, {
    margin: "small"
  }), /*#__PURE__*/React.createElement(Paragraph, {
    margin: "medium"
  }), /*#__PURE__*/React.createElement(Paragraph, {
    margin: "large"
  }), /*#__PURE__*/React.createElement(Paragraph, {
    margin: "none"
  }), /*#__PURE__*/React.createElement(Paragraph, {
    margin: {
      bottom: 'small'
    }
  }), /*#__PURE__*/React.createElement(Paragraph, {
    margin: {
      top: 'small'
    }
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Paragraph textAlign renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Paragraph, {
    textAlign: "start"
  }), /*#__PURE__*/React.createElement(Paragraph, {
    textAlign: "center"
  }), /*#__PURE__*/React.createElement(Paragraph, {
    textAlign: "end"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});