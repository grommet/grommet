import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { Text } from '..';
test('renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Text, null, "text")));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders size', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Text, {
    size: "xsmall"
  }), React.createElement(Text, {
    size: "small"
  }), React.createElement(Text, {
    size: "medium"
  }), React.createElement(Text, {
    size: "large"
  }), React.createElement(Text, {
    size: "xlarge"
  }), React.createElement(Text, {
    size: "xxlarge"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders textAlign', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Text, {
    textAlign: "start"
  }), React.createElement(Text, {
    textAlign: "center"
  }), React.createElement(Text, {
    textAlign: "end"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders margin', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Text, {
    margin: "small"
  }), React.createElement(Text, {
    margin: "medium"
  }), React.createElement(Text, {
    margin: "large"
  }), React.createElement(Text, {
    margin: "none"
  }), React.createElement(Text, {
    margin: {
      vertical: 'small'
    }
  }), React.createElement(Text, {
    margin: {
      horizontal: 'small'
    }
  }), React.createElement(Text, {
    margin: {
      bottom: 'small'
    }
  }), React.createElement(Text, {
    margin: {
      top: 'small'
    }
  }), React.createElement(Text, {
    margin: {
      left: 'small'
    }
  }), React.createElement(Text, {
    margin: {
      right: 'small'
    }
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
var LONG = 'a b c d e f g h i j k l m n o p q r s t u v w x y z';
test('renders truncate', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Text, {
    truncate: false
  }, LONG), React.createElement(Text, {
    truncate: true
  }, LONG)));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders color', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Text, {
    color: "status-critical"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders tag', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Text, {
    tag: "div"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders weight', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Text, {
    weight: "normal"
  }), React.createElement(Text, {
    weight: "bold"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});