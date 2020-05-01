"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _Grommet = require("../../Grommet");

var _Box = require("../../Box");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('RadioButton', function () {
  test('basic', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.RadioButton, {
      name: "test",
      value: "1"
    }), /*#__PURE__*/_react["default"].createElement(_.RadioButton, {
      id: "test id",
      name: "test",
      value: "2"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('label', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.RadioButton, {
      label: "test label",
      name: "test",
      value: "1"
    }), /*#__PURE__*/_react["default"].createElement(_.RadioButton, {
      label: /*#__PURE__*/_react["default"].createElement("div", null, "test label"),
      name: "test",
      value: "2"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('checked', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.RadioButton, {
      checked: true,
      name: "test",
      value: "1"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('disabled', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.RadioButton, {
      disabled: true,
      name: "test",
      value: "1"
    }), /*#__PURE__*/_react["default"].createElement(_.RadioButton, {
      disabled: true,
      checked: true,
      name: "test",
      value: "2"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('children', function () {
    var child = function child(_ref) {
      var checked = _ref.checked;
      return /*#__PURE__*/_react["default"].createElement(_Box.Box, {
        pad: "small",
        background: checked ? 'accent-1' : 'control'
      });
    };

    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.RadioButton, {
      name: "test",
      value: "1"
    }, child), /*#__PURE__*/_react["default"].createElement(_.RadioButton, {
      checked: true,
      name: "test",
      value: "2"
    }, child)));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});