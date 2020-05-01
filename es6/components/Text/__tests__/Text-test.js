import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { Text } from '..';
test('renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Text, null, "text")));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders size', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Text, {
    size: "xsmall"
  }), /*#__PURE__*/React.createElement(Text, {
    size: "small"
  }), /*#__PURE__*/React.createElement(Text, {
    size: "medium"
  }), /*#__PURE__*/React.createElement(Text, {
    size: "large"
  }), /*#__PURE__*/React.createElement(Text, {
    size: "xlarge"
  }), /*#__PURE__*/React.createElement(Text, {
    size: "xxlarge"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders textAlign', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Text, {
    textAlign: "start"
  }), /*#__PURE__*/React.createElement(Text, {
    textAlign: "center"
  }), /*#__PURE__*/React.createElement(Text, {
    textAlign: "end"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders margin', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Text, {
    margin: "small"
  }), /*#__PURE__*/React.createElement(Text, {
    margin: "medium"
  }), /*#__PURE__*/React.createElement(Text, {
    margin: "large"
  }), /*#__PURE__*/React.createElement(Text, {
    margin: "none"
  }), /*#__PURE__*/React.createElement(Text, {
    margin: {
      vertical: 'small'
    }
  }), /*#__PURE__*/React.createElement(Text, {
    margin: {
      horizontal: 'small'
    }
  }), /*#__PURE__*/React.createElement(Text, {
    margin: {
      bottom: 'small'
    }
  }), /*#__PURE__*/React.createElement(Text, {
    margin: {
      top: 'small'
    }
  }), /*#__PURE__*/React.createElement(Text, {
    margin: {
      left: 'small'
    }
  }), /*#__PURE__*/React.createElement(Text, {
    margin: {
      right: 'small'
    }
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
var LONG = 'a b c d e f g h i j k l m n o p q r s t u v w x y z';
test('renders truncate', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Text, {
    truncate: false
  }, LONG), /*#__PURE__*/React.createElement(Text, {
    truncate: true
  }, LONG)));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders color', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Text, {
    color: "status-critical"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders tag', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Text, {
    as: "div"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('proxies tag', function () {
  var tagComponent = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Text, {
    tag: "div"
  })));
  var asComponent = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Text, {
    as: "div"
  })));
  expect(tagComponent.toJSON()).toEqual(asComponent.toJSON());
});
test('renders weight', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Text, {
    weight: "normal"
  }), /*#__PURE__*/React.createElement(Text, {
    weight: "bold"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});