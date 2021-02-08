"use strict";

exports.__esModule = true;
exports["default"] = exports.SelectPlace = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SelectPlace = function SelectPlace() {
  var _React$useState = _react["default"].useState(),
      places = _React$useState[0],
      setPlaces = _React$useState[1];

  var onSelectPlace = function onSelectPlace(place) {
    setPlaces([{
      color: 'graph-1',
      location: place
    }]);
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.WorldMap, {
    onSelectPlace: onSelectPlace,
    places: places
  })));
};

exports.SelectPlace = SelectPlace;
SelectPlace.storyName = 'Select place';
SelectPlace.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Visualizations/WorldMap/Select place'
};
exports["default"] = _default;