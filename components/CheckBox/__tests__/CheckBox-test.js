"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@testing-library/react");

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('CheckBox', function () {
  afterEach(_react2.cleanup);
  test('renders', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.CheckBox, null), /*#__PURE__*/_react["default"].createElement(_.CheckBox, {
      id: "test id",
      name: "test name"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('label renders', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.CheckBox, {
      label: "test label"
    }), /*#__PURE__*/_react["default"].createElement(_.CheckBox, {
      label: /*#__PURE__*/_react["default"].createElement("div", null, "test label")
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('checked renders', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.CheckBox, {
      checked: true
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('disabled renders', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.CheckBox, {
      disabled: true
    }), /*#__PURE__*/_react["default"].createElement(_.CheckBox, {
      disabled: true,
      checked: true
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('reverse renders', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.CheckBox, {
      reverse: true,
      label: "test label"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('toggle renders', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.CheckBox, {
      toggle: true
    }), /*#__PURE__*/_react["default"].createElement(_.CheckBox, {
      toggle: true,
      checked: true
    }), /*#__PURE__*/_react["default"].createElement(_.CheckBox, {
      toggle: true,
      label: "test label"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('indeterminate renders', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.CheckBox, {
      indeterminate: true
    }), /*#__PURE__*/_react["default"].createElement(_.CheckBox, {
      indeterminate: true,
      label: "test label"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('indeterminate checked warns', function () {
    var spy = jest.spyOn(global.console, 'warn');

    _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.CheckBox, {
      indeterminate: true,
      checked: true
    })));

    expect(spy).toBeCalledWith('Checkbox cannot be "checked" and "indeterminate" at the same time.');
  });
  test('indeterminate toggle warns', function () {
    var spy = jest.spyOn(global.console, 'warn');

    _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.CheckBox, {
      indeterminate: true,
      toggle: true
    })));

    expect(spy).toBeCalledWith('Checkbox of type toggle does not have "indeterminate" state.');
  });
  test('controlled', function () {
    var _render = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.CheckBox, {
      label: "test-label",
      checked: true
    }))),
        container = _render.container,
        getByText = _render.getByText;

    expect(container.firstChild).toMatchSnapshot();

    _react2.fireEvent.click(getByText('test-label'));

    expect(container.firstChild).toMatchSnapshot();
  });
});