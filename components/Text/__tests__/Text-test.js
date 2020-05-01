"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

test('renders', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Text, null, "text")));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders size', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Text, {
    size: "xsmall"
  }), /*#__PURE__*/_react["default"].createElement(_.Text, {
    size: "small"
  }), /*#__PURE__*/_react["default"].createElement(_.Text, {
    size: "medium"
  }), /*#__PURE__*/_react["default"].createElement(_.Text, {
    size: "large"
  }), /*#__PURE__*/_react["default"].createElement(_.Text, {
    size: "xlarge"
  }), /*#__PURE__*/_react["default"].createElement(_.Text, {
    size: "xxlarge"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders textAlign', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Text, {
    textAlign: "start"
  }), /*#__PURE__*/_react["default"].createElement(_.Text, {
    textAlign: "center"
  }), /*#__PURE__*/_react["default"].createElement(_.Text, {
    textAlign: "end"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders margin', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Text, {
    margin: "small"
  }), /*#__PURE__*/_react["default"].createElement(_.Text, {
    margin: "medium"
  }), /*#__PURE__*/_react["default"].createElement(_.Text, {
    margin: "large"
  }), /*#__PURE__*/_react["default"].createElement(_.Text, {
    margin: "none"
  }), /*#__PURE__*/_react["default"].createElement(_.Text, {
    margin: {
      vertical: 'small'
    }
  }), /*#__PURE__*/_react["default"].createElement(_.Text, {
    margin: {
      horizontal: 'small'
    }
  }), /*#__PURE__*/_react["default"].createElement(_.Text, {
    margin: {
      bottom: 'small'
    }
  }), /*#__PURE__*/_react["default"].createElement(_.Text, {
    margin: {
      top: 'small'
    }
  }), /*#__PURE__*/_react["default"].createElement(_.Text, {
    margin: {
      left: 'small'
    }
  }), /*#__PURE__*/_react["default"].createElement(_.Text, {
    margin: {
      right: 'small'
    }
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
var LONG = 'a b c d e f g h i j k l m n o p q r s t u v w x y z';
test('renders truncate', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Text, {
    truncate: false
  }, LONG), /*#__PURE__*/_react["default"].createElement(_.Text, {
    truncate: true
  }, LONG)));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders color', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Text, {
    color: "status-critical"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('renders tag', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Text, {
    as: "div"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('proxies tag', function () {
  var tagComponent = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Text, {
    tag: "div"
  })));

  var asComponent = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Text, {
    as: "div"
  })));

  expect(tagComponent.toJSON()).toEqual(asComponent.toJSON());
});
test('renders weight', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Text, {
    weight: "normal"
  }), /*#__PURE__*/_react["default"].createElement(_.Text, {
    weight: "bold"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});