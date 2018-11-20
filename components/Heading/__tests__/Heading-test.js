"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('Heading renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Heading, null)));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Heading level renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Heading, {
    level: 1
  }), _react.default.createElement(_.Heading, {
    level: 2
  }), _react.default.createElement(_.Heading, {
    level: 3
  }), _react.default.createElement(_.Heading, {
    level: 4
  }), _react.default.createElement(_.Heading, {
    level: "1"
  }), _react.default.createElement(_.Heading, {
    level: "2"
  }), _react.default.createElement(_.Heading, {
    level: "3"
  }), _react.default.createElement(_.Heading, {
    level: "4"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Heading size renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Heading, {
    level: 1,
    size: "small"
  }), _react.default.createElement(_.Heading, {
    level: 1,
    size: "medium"
  }), _react.default.createElement(_.Heading, {
    level: 1,
    size: "large"
  }), _react.default.createElement(_.Heading, {
    level: 1,
    size: "xlarge"
  }), _react.default.createElement(_.Heading, {
    level: 2,
    size: "small"
  }), _react.default.createElement(_.Heading, {
    level: 2,
    size: "medium"
  }), _react.default.createElement(_.Heading, {
    level: 2,
    size: "large"
  }), _react.default.createElement(_.Heading, {
    level: 2,
    size: "xlarge"
  }), _react.default.createElement(_.Heading, {
    level: 3,
    size: "small"
  }), _react.default.createElement(_.Heading, {
    level: 3,
    size: "medium"
  }), _react.default.createElement(_.Heading, {
    level: 3,
    size: "large"
  }), _react.default.createElement(_.Heading, {
    level: 3,
    size: "xlarge"
  }), _react.default.createElement(_.Heading, {
    level: 4,
    size: "small"
  }), _react.default.createElement(_.Heading, {
    level: 4,
    size: "medium"
  }), _react.default.createElement(_.Heading, {
    level: 4,
    size: "large"
  }), _react.default.createElement(_.Heading, {
    level: 4,
    size: "xlarge"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Heading textAlign renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Heading, {
    textAlign: "start"
  }), _react.default.createElement(_.Heading, {
    textAlign: "center"
  }), _react.default.createElement(_.Heading, {
    textAlign: "end"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Heading margin renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Heading, {
    margin: "small"
  }), _react.default.createElement(_.Heading, {
    margin: "medium"
  }), _react.default.createElement(_.Heading, {
    margin: "large"
  }), _react.default.createElement(_.Heading, {
    margin: "none"
  }), _react.default.createElement(_.Heading, {
    margin: {
      bottom: 'small'
    }
  }), _react.default.createElement(_.Heading, {
    margin: {
      top: 'small'
    }
  }), _react.default.createElement(_.Heading, {
    margin: {
      bottom: 'none'
    }
  }), _react.default.createElement(_.Heading, {
    margin: {
      top: 'none'
    }
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('Heading color renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Heading, {
    color: "brand"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
var LONG = 'a b c d e f g h i j k l m n o p q r s t u v w x y z';
test('Heading truncate renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Heading, {
    truncate: false
  }, LONG), _react.default.createElement(_.Heading, {
    truncate: true
  }, LONG)));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('responsive renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Heading, {
    responsive: true
  }), _react.default.createElement(_.Heading, {
    responsive: false
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});