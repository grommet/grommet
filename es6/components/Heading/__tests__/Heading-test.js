import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { Heading } from '..';
test('Heading renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Heading, null)));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Heading level renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Heading, {
    level: 1
  }), React.createElement(Heading, {
    level: 2
  }), React.createElement(Heading, {
    level: 3
  }), React.createElement(Heading, {
    level: 4
  }), React.createElement(Heading, {
    level: "1"
  }), React.createElement(Heading, {
    level: "2"
  }), React.createElement(Heading, {
    level: "3"
  }), React.createElement(Heading, {
    level: "4"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Heading size renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Heading, {
    level: 1,
    size: "small"
  }), React.createElement(Heading, {
    level: 1,
    size: "medium"
  }), React.createElement(Heading, {
    level: 1,
    size: "large"
  }), React.createElement(Heading, {
    level: 1,
    size: "xlarge"
  }), React.createElement(Heading, {
    level: 2,
    size: "small"
  }), React.createElement(Heading, {
    level: 2,
    size: "medium"
  }), React.createElement(Heading, {
    level: 2,
    size: "large"
  }), React.createElement(Heading, {
    level: 2,
    size: "xlarge"
  }), React.createElement(Heading, {
    level: 3,
    size: "small"
  }), React.createElement(Heading, {
    level: 3,
    size: "medium"
  }), React.createElement(Heading, {
    level: 3,
    size: "large"
  }), React.createElement(Heading, {
    level: 3,
    size: "xlarge"
  }), React.createElement(Heading, {
    level: 4,
    size: "small"
  }), React.createElement(Heading, {
    level: 4,
    size: "medium"
  }), React.createElement(Heading, {
    level: 4,
    size: "large"
  }), React.createElement(Heading, {
    level: 4,
    size: "xlarge"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Heading textAlign renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Heading, {
    textAlign: "start"
  }), React.createElement(Heading, {
    textAlign: "center"
  }), React.createElement(Heading, {
    textAlign: "end"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Heading margin renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Heading, {
    margin: "small"
  }), React.createElement(Heading, {
    margin: "medium"
  }), React.createElement(Heading, {
    margin: "large"
  }), React.createElement(Heading, {
    margin: "none"
  }), React.createElement(Heading, {
    margin: {
      bottom: 'small'
    }
  }), React.createElement(Heading, {
    margin: {
      top: 'small'
    }
  }), React.createElement(Heading, {
    margin: {
      bottom: 'none'
    }
  }), React.createElement(Heading, {
    margin: {
      top: 'none'
    }
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Heading color renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Heading, {
    color: "brand"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
var LONG = 'a b c d e f g h i j k l m n o p q r s t u v w x y z';
test('Heading truncate renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Heading, {
    truncate: false
  }, LONG), React.createElement(Heading, {
    truncate: true
  }, LONG)));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('responsive renders', function () {
  var component = renderer.create(React.createElement(Grommet, null, React.createElement(Heading, {
    responsive: true
  }), React.createElement(Heading, {
    responsive: false
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});