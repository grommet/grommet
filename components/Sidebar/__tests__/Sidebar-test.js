"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@testing-library/react");

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _Avatar = require("../../Avatar");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var src = '';
describe('Sidebar', function () {
  afterEach(_react2.cleanup);
  test('renders', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.Sidebar, {
      id: "test id",
      name: "test name"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('header', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.Sidebar, {
      header: _react["default"].createElement(_Avatar.Avatar, {
        src: src
      })
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('footer', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.Sidebar, {
      footer: _react["default"].createElement(_Avatar.Avatar, {
        src: src
      })
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('children', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.Sidebar, null, _react["default"].createElement(_Avatar.Avatar, {
      src: src
    }), "children test")));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('all', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.Sidebar, {
      footer: _react["default"].createElement(_Avatar.Avatar, null, "SY"),
      header: _react["default"].createElement(_Avatar.Avatar, {
        src: src
      }),
      background: "brand"
    }, "test all props and children")));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});