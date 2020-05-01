"use strict";

var _react = _interopRequireDefault(require("react"));

require("jest-styled-components");

var _react2 = require("@testing-library/react");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('Distribution', function () {
  test('renders', function () {
    var _render = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Distribution, {
      values: []
    }))),
        container = _render.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('values renders', function () {
    var _render2 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.Distribution, {
      values: [{
        value: 20
      }, {
        value: 3
      }, {
        value: 2
      }, {
        value: 1
      }]
    }, function (value) {
      return /*#__PURE__*/_react["default"].createElement("span", null, value.value);
    }))),
        container = _render2.container;

    expect(container.firstChild).toMatchSnapshot();
  });
  test('gap renders', function () {
    var _render3 = (0, _react2.render)( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, ['xsmall', 'small', 'medium', 'large'].map(function (gap) {
      return /*#__PURE__*/_react["default"].createElement(_.Distribution, {
        key: gap,
        gap: gap,
        values: [{
          value: 3
        }, {
          value: 2
        }, {
          value: 1
        }]
      }, function (value) {
        return /*#__PURE__*/_react["default"].createElement("span", null, value.value);
      });
    }))),
        container = _render3.container;

    expect(container.firstChild).toMatchSnapshot();
  });
});