"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

describe('WorldMap', function () {
  test('default', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.WorldMap, null)));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('color', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.WorldMap, {
      color: "brand"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('continents', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.WorldMap, {
      continents: [{
        name: 'Africa',
        color: 'accent-1',
        onClick: function onClick() {}
      }]
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('places', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.WorldMap, {
      places: [{
        name: 'Sydney',
        location: [-33.8830555556, 151.216666667],
        color: 'accent-1',
        onClick: function onClick() {}
      }]
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('onSelectPlace', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.WorldMap, {
      onSelectPlace: function onSelectPlace() {}
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('fill', function () {
    var component = _reactTestRenderer["default"].create( /*#__PURE__*/_react["default"].createElement(_Grommet.Grommet, null, /*#__PURE__*/_react["default"].createElement(_.WorldMap, {
      fill: true
    }), /*#__PURE__*/_react["default"].createElement(_.WorldMap, {
      fill: false
    }), /*#__PURE__*/_react["default"].createElement(_.WorldMap, {
      fill: "horizontal"
    }), /*#__PURE__*/_react["default"].createElement(_.WorldMap, {
      fill: "vertical"
    })));

    var tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});