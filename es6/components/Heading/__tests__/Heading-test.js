import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import { Grommet } from '../../Grommet';
import { Heading } from '..';
test('Heading renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Heading, null)));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Heading level renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Heading, {
    level: 1
  }), /*#__PURE__*/React.createElement(Heading, {
    level: 2
  }), /*#__PURE__*/React.createElement(Heading, {
    level: 3
  }), /*#__PURE__*/React.createElement(Heading, {
    level: 4
  }), /*#__PURE__*/React.createElement(Heading, {
    level: "1"
  }), /*#__PURE__*/React.createElement(Heading, {
    level: "2"
  }), /*#__PURE__*/React.createElement(Heading, {
    level: "3"
  }), /*#__PURE__*/React.createElement(Heading, {
    level: "4"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Heading size renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Heading, {
    level: 1,
    size: "small"
  }), /*#__PURE__*/React.createElement(Heading, {
    level: 1,
    size: "medium"
  }), /*#__PURE__*/React.createElement(Heading, {
    level: 1,
    size: "large"
  }), /*#__PURE__*/React.createElement(Heading, {
    level: 1,
    size: "xlarge"
  }), /*#__PURE__*/React.createElement(Heading, {
    level: 2,
    size: "small"
  }), /*#__PURE__*/React.createElement(Heading, {
    level: 2,
    size: "medium"
  }), /*#__PURE__*/React.createElement(Heading, {
    level: 2,
    size: "large"
  }), /*#__PURE__*/React.createElement(Heading, {
    level: 2,
    size: "xlarge"
  }), /*#__PURE__*/React.createElement(Heading, {
    level: 3,
    size: "small"
  }), /*#__PURE__*/React.createElement(Heading, {
    level: 3,
    size: "medium"
  }), /*#__PURE__*/React.createElement(Heading, {
    level: 3,
    size: "large"
  }), /*#__PURE__*/React.createElement(Heading, {
    level: 3,
    size: "xlarge"
  }), /*#__PURE__*/React.createElement(Heading, {
    level: 4,
    size: "small"
  }), /*#__PURE__*/React.createElement(Heading, {
    level: 4,
    size: "medium"
  }), /*#__PURE__*/React.createElement(Heading, {
    level: 4,
    size: "large"
  }), /*#__PURE__*/React.createElement(Heading, {
    level: 4,
    size: "xlarge"
  }), /*#__PURE__*/React.createElement(Heading, {
    level: 1,
    size: "77px"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Heading textAlign renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Heading, {
    textAlign: "start"
  }), /*#__PURE__*/React.createElement(Heading, {
    textAlign: "center"
  }), /*#__PURE__*/React.createElement(Heading, {
    textAlign: "end"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Heading margin renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Heading, {
    margin: "small"
  }), /*#__PURE__*/React.createElement(Heading, {
    margin: "medium"
  }), /*#__PURE__*/React.createElement(Heading, {
    margin: "large"
  }), /*#__PURE__*/React.createElement(Heading, {
    margin: "none"
  }), /*#__PURE__*/React.createElement(Heading, {
    margin: {
      bottom: 'small'
    }
  }), /*#__PURE__*/React.createElement(Heading, {
    margin: {
      top: 'small'
    }
  }), /*#__PURE__*/React.createElement(Heading, {
    margin: {
      bottom: 'none'
    }
  }), /*#__PURE__*/React.createElement(Heading, {
    margin: {
      top: 'none'
    }
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Heading color renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Heading, {
    color: "brand"
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
var LONG = 'a b c d e f g h i j k l m n o p q r s t u v w x y z';
test('Heading truncate renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Heading, {
    truncate: false
  }, LONG), /*#__PURE__*/React.createElement(Heading, {
    truncate: true
  }, LONG)));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('responsive renders', function () {
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, null, /*#__PURE__*/React.createElement(Heading, {
    responsive: true
  }), /*#__PURE__*/React.createElement(Heading, {
    responsive: false
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Theme based font family renders', function () {
  var customTheme = {
    heading: {
      font: {
        family: 'Fira Sans'
      },
      level: {
        1: {
          font: {
            family: 'Arial'
          }
        },
        2: {
          font: {
            family: 'Roboto'
          }
        },
        3: {
          font: {
            family: 'Ubuntu'
          }
        }
      }
    }
  };
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, {
    theme: customTheme
  }, /*#__PURE__*/React.createElement(Heading, {
    level: 1
  }), /*#__PURE__*/React.createElement(Heading, {
    level: 2
  }), /*#__PURE__*/React.createElement(Heading, {
    level: 3
  }), /*#__PURE__*/React.createElement(Heading, {
    level: 4
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Theme based font weight renders', function () {
  var customTheme = {
    heading: {
      weight: 600,
      level: {
        1: {
          font: {
            weight: '700'
          }
        },
        2: {
          font: {
            weight: '400'
          }
        },
        3: {
          font: {
            weight: '200'
          }
        }
      }
    }
  };
  var component = renderer.create( /*#__PURE__*/React.createElement(Grommet, {
    theme: customTheme
  }, /*#__PURE__*/React.createElement(Heading, {
    level: 1
  }), /*#__PURE__*/React.createElement(Heading, {
    level: 2
  }), /*#__PURE__*/React.createElement(Heading, {
    level: 3
  }), /*#__PURE__*/React.createElement(Heading, {
    level: 4
  })));
  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});