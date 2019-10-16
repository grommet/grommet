"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SimpleWorldMap = function SimpleWorldMap() {
  var _React$useState = _react["default"].useState(),
      places = _React$useState[0],
      setPlaces = _React$useState[1];

  var onSelectPlace = function onSelectPlace(place) {
    setPlaces([{
      color: 'accent-1',
      location: place
    }]);
  };

  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react["default"].createElement(_grommet.WorldMap, {
    onSelectPlace: onSelectPlace,
    places: places
  })));
};

(0, _react2.storiesOf)('WorldMap', module).add('Simple', function () {
  return _react["default"].createElement(SimpleWorldMap, null);
});