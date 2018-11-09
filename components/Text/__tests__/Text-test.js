"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Text, null, "text")));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders size', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Text, {
    size: "xsmall"
  }), _react.default.createElement(_.Text, {
    size: "small"
  }), _react.default.createElement(_.Text, {
    size: "medium"
  }), _react.default.createElement(_.Text, {
    size: "large"
  }), _react.default.createElement(_.Text, {
    size: "xlarge"
  }), _react.default.createElement(_.Text, {
    size: "xxlarge"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders textAlign', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Text, {
    textAlign: "start"
  }), _react.default.createElement(_.Text, {
    textAlign: "center"
  }), _react.default.createElement(_.Text, {
    textAlign: "end"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders margin', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Text, {
    margin: "small"
  }), _react.default.createElement(_.Text, {
    margin: "medium"
  }), _react.default.createElement(_.Text, {
    margin: "large"
  }), _react.default.createElement(_.Text, {
    margin: "none"
  }), _react.default.createElement(_.Text, {
    margin: {
      vertical: 'small'
    }
  }), _react.default.createElement(_.Text, {
    margin: {
      horizontal: 'small'
    }
  }), _react.default.createElement(_.Text, {
    margin: {
      bottom: 'small'
    }
  }), _react.default.createElement(_.Text, {
    margin: {
      top: 'small'
    }
  }), _react.default.createElement(_.Text, {
    margin: {
      left: 'small'
    }
  }), _react.default.createElement(_.Text, {
    margin: {
      right: 'small'
    }
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
var LONG = 'a b c d e f g h i j k l m n o p q r s t u v w x y z';
test('renders truncate', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Text, {
    truncate: false
  }, LONG), _react.default.createElement(_.Text, {
    truncate: true
  }, LONG)));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders color', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Text, {
    color: "status-critical"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders tag', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Text, {
    tag: "div"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders weight', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.Text, {
    weight: "normal"
  }), _react.default.createElement(_.Text, {
    weight: "bold"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});