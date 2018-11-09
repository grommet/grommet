"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactTestRenderer = _interopRequireDefault(require("react-test-renderer"));

require("jest-styled-components");

var _Grommet = require("../../Grommet");

var _ = require("..");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('WorldMap renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.WorldMap, null)));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('WorldMap color renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.WorldMap, {
    color: "brand"
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('WorldMap continents renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.WorldMap, {
    continents: [{
      name: 'Africa',
      color: 'accent-1',
      onClick: function onClick() {}
    }]
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
test('WorldMap places renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.WorldMap, {
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
test('WorldMap onSelectPlace renders', function () {
  var component = _reactTestRenderer.default.create(_react.default.createElement(_Grommet.Grommet, null, _react.default.createElement(_.WorldMap, {
    onSelectPlace: function onSelectPlace() {}
  })));

  var tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});