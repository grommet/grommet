"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

test('RangeInput renders', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.RangeInput, {
    value: "50"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('RangeInput track themed', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, {
    theme: {
      rangeInput: {
        track: {
          color: 'brand'
        }
      }
    }
  }, /*#__PURE__*/_react["default"].createElement(_.RangeInput, {
    value: "10"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('RangeInput track themed with color and opacity', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, {
    theme: {
      rangeInput: {
        track: {
          color: 'brand',
          opacity: 0.3
        }
      }
    }
  }, /*#__PURE__*/_react["default"].createElement(_.RangeInput, {
    value: "10"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('with min and max offset', function () {
  var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.RangeInput, {
    min: 10,
    max: 20,
    step: 1,
    value: 15
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});