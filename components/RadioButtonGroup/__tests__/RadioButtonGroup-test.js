"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _Grommet = require("../../Grommet");

var _Box = require("../../Box");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('RadioButtonGroup', function () {
  test('default', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.RadioButtonGroup, {
      name: "test",
      options: []
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('string options', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.RadioButtonGroup, {
      name: "test",
      options: ['one', 'two'],
      value: "one"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('object options just value', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.RadioButtonGroup, {
      name: "test",
      options: [{
        value: 'one'
      }, {
        value: 'two'
      }],
      value: "two"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('object options', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.RadioButtonGroup, {
      name: "test",
      options: [{
        id: 'onE',
        label: 'One',
        value: 'one'
      }, {
        id: 'twO',
        label: 'Two',
        value: 'two'
      }]
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('object options disabled', function () {
    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.RadioButtonGroup, {
      name: "test",
      options: [{
        value: 'one',
        disabled: true
      }, {
        value: 'two'
      }]
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('children', function () {
    var child = function child(_ref) {
      var checked = _ref.checked;
      return _react["default"].createElement(_Box.Box, {
        pad: "small",
        background: checked ? 'accent-1' : 'control'
      });
    };

    var component = _reactTestRenderer["default"].create(_react["default"].createElement(_Grommet.Grommet, null, _react["default"].createElement(_.RadioButtonGroup, {
      name: "test",
      options: ['one', 'two'],
      value: "one"
    }, child)));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});