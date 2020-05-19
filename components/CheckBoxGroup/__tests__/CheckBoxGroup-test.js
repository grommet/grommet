"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@testing-library/react");

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('CheckBoxGroup', function () {
  afterEach(_react2.cleanup);
  test('options renders', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.CheckBoxGroup, {
      options: ['First', 'Second']
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('value renders', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.CheckBoxGroup, {
      value: ['First'],
      options: ['First', 'Second']
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('initial value renders', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.CheckBoxGroup, {
      value: ['Wuhan', 'Jerusalem'],
      options: [{
        label: 'Maui',
        value: 'Maui'
      }, {
        label: 'Jerusalem',
        value: 'Jerusalem'
      }, {
        label: 'Wuhan',
        value: 'Wuhan'
      }]
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('disabled renders', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.CheckBoxGroup, {
      disabled: true,
      options: ['First', 'Second']
    }), /*#__PURE__*/_react["default"].createElement(_.CheckBoxGroup, {
      options: [{
        label: 'First',
        disabled: true
      }]
    }), /*#__PURE__*/_react["default"].createElement(_.CheckBoxGroup, {
      options: [{
        label: 'First',
        disabled: true
      }]
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});