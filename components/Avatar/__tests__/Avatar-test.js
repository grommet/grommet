"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@testing-library/react");

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _grommetIcons = require("grommet-icons");

var _Box = require("../../Box");

var _Grommet = require("../../Grommet");

var _Stack = require("../../Stack");

var _Text = require("../../Text");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var src = '';
describe('Avatar', function () {
  afterEach(_react2.cleanup);
  test('renders', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Avatar, null), /*#__PURE__*/_react["default"].createElement(_.Avatar, {
      id: "test id",
      name: "test name"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('size renders', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Avatar, {
      size: "xsmall",
      src: src
    }), /*#__PURE__*/_react["default"].createElement(_.Avatar, {
      size: "small",
      src: src
    }), /*#__PURE__*/_react["default"].createElement(_.Avatar, {
      src: src
    }), /*#__PURE__*/_react["default"].createElement(_.Avatar, {
      size: "large",
      src: src
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('round renders', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Avatar, {
      src: src,
      round: false
    }), /*#__PURE__*/_react["default"].createElement(_.Avatar, {
      src: src,
      round: "xsmall"
    }), /*#__PURE__*/_react["default"].createElement(_.Avatar, {
      src: src,
      round: "small"
    }), /*#__PURE__*/_react["default"].createElement(_.Avatar, {
      src: src,
      round: "medium"
    }), /*#__PURE__*/_react["default"].createElement(_.Avatar, {
      src: src,
      round: "large"
    }), /*#__PURE__*/_react["default"].createElement(_.Avatar, {
      src: src
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('text renders', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Avatar, {
      background: "dark-2"
    }, /*#__PURE__*/_react["default"].createElement(_Text.Text, {
      alignSelf: "center",
      size: "xlarge"
    }, "R")), /*#__PURE__*/_react["default"].createElement(_.Avatar, {
      background: "brand"
    }, /*#__PURE__*/_react["default"].createElement(_Text.Text, {
      alignSelf: "center",
      size: "xlarge"
    }, "SY"))));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('icon renders', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Avatar, {
      src: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Favorite, {
        color: "accent-2"
      }),
      background: "accent-4"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('stack renders', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_Stack.Stack, {
      anchor: "bottom-right"
    }, /*#__PURE__*/_react["default"].createElement(_Box.Box, null, /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      direction: "row"
    }, /*#__PURE__*/_react["default"].createElement(_.Avatar, {
      size: "xsmall",
      src: src
    }), /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      pad: "xxsmall"
    })), /*#__PURE__*/_react["default"].createElement(_Box.Box, {
      pad: "xxsmall"
    })), /*#__PURE__*/_react["default"].createElement(_.Avatar, {
      src: src,
      size: "42px"
    }))));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});