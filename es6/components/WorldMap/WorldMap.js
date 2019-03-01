function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { Component } from 'react';
import { compose } from 'recompose';
import { withTheme } from 'styled-components';
import { defaultProps } from '../../default-props';
import { normalizeColor, parseMetricToNum } from '../../utils';
import { StyledWorldMap } from './StyledWorldMap'; // The graphic is drawn as a rectangular grid using coordinates spaced
// by FACTOR pixels. The contents have both an area boundary for interaction
// and dots described as rows where each row is described by three values:
// a starting coordinate and a length. This approach is more efficient than
// describing it via SVG elements, keeping the code/library size smaller.

var CONTINENTS = [{
  name: 'Australia',
  origin: [74, 32],
  area: [[4, 0], [7, 1], [15, 7], [13, 9], [0, 6], [0, 2]],
  dots: [[4, 0, 1], [2, 1, 6], [0, 2, 9], [0, 3, 10], [0, 4, 10], [0, 5, 3], [5, 5, 5], [5, 6, 4], [15, 7, 1], [14, 8, 1], [13, 9, 1]]
}, {
  name: 'Asia',
  origin: [52, 1],
  area: [[16, 0], [38, 5], [40, 7], [28, 17], [24, 25], [29, 29], [19, 29], [11, 24], [3, 23], [0, 20], [0, 19], [6, 13], [7, 6]],
  dots: [[16, 0, 1], [17, 1, 2], [18, 2, 2], [15, 3, 6], [28, 3, 1], [30, 3, 1], [10, 4, 2], [13, 4, 10], [24, 4, 1], [9, 5, 22], [32, 5, 1], [38, 5, 1], [7, 6, 2], [10, 6, 1], [12, 6, 27], [7, 7, 34], [7, 8, 31], [7, 9, 26], [34, 9, 3], [7, 10, 22], [31, 10, 1], [33, 10, 1], [7, 11, 21], [32, 11, 2], [7, 12, 21], [32, 12, 1], [6, 13, 22], [32, 13, 1], [6, 14, 22], [5, 15, 22], [3, 16, 2], [6, 16, 20], [2, 17, 3], [6, 17, 16], [24, 17, 1], [28, 17, 1], [1, 18, 22], [26, 18, 2], [0, 19, 24], [0, 20, 5], [6, 20, 17], [2, 21, 5], [10, 21, 14], [2, 22, 5], [11, 22, 4], [16, 22, 4], [3, 23, 3], [11, 23, 2], [17, 23, 3], [23, 23, 1], [11, 24, 2], [18, 24, 2], [23, 24, 1], [24, 25, 1], [18, 26, 1], [22, 26, 1], [18, 27, 1], [20, 27, 4], [18, 28, 1], [21, 28, 1], [23, 28, 1], [26, 28, 3], [19, 29, 1], [28, 29, 2]]
}, {
  // 21X, 40Y
  name: 'Africa',
  origin: [40, 19],
  area: [[3, 0], [6, 0], [11, 2], [16, 7], [16, 15], [11, 18], [9, 18], [0, 6], [0, 3]],
  dots: [[3, 0, 4], [2, 1, 6], [9, 1, 2], [1, 2, 11], [0, 3, 13], [0, 4, 14], [0, 5, 14], [0, 6, 16], [1, 7, 16], [2, 8, 2], [6, 8, 11], [7, 9, 9], [7, 10, 8], [7, 11, 7], [8, 12, 7], [7, 13, 8], [7, 14, 7], [16, 14, 1], [8, 15, 5], [15, 15, 2], [8, 16, 5], [9, 17, 3], [9, 18, 3]]
}, {
  name: 'Europe',
  origin: [39, 2],
  area: [[8, 0], [10, 0], [20, 2], [19, 11], [18, 13], [14, 16], [3, 16], [0, 7]],
  dots: [[8, 0, 3], [9, 1, 1], [20, 2, 1], [19, 3, 1], [12, 4, 1], [19, 4, 1], [9, 5, 6], [9, 6, 7], [17, 6, 3], [0, 7, 1], [8, 7, 12], [7, 8, 3], [11, 8, 9], [7, 9, 3], [11, 9, 9], [4, 10, 1], [7, 10, 1], [9, 10, 1], [11, 10, 9], [3, 11, 2], [7, 11, 13], [4, 12, 1], [6, 12, 13], [4, 13, 15], [5, 14, 3], [9, 14, 4], [15, 14, 2], [3, 15, 3], [8, 15, 1], [10, 15, 5], [6, 15, 2], [3, 16, 2], [10, 16, 5]]
}, {
  name: 'South America',
  origin: [22, 26],
  area: [[2, 0], [5, 0], [11, 4], [11, 8], [3, 18], [2, 17], [0, 4], [0, 3]],
  dots: [[2, 0, 4], [1, 1, 7], [1, 2, 7], [0, 3, 10], [0, 4, 12], [1, 5, 11], [2, 6, 9], [3, 7, 8], [3, 8, 8], [3, 9, 6], [3, 10, 6], [3, 11, 5], [3, 12, 3], [2, 13, 3], [2, 14, 3], [2, 15, 2], [2, 16, 2], [2, 17, 2], [3, 18, 1]]
}, {
  name: 'North America',
  origin: [0, 0],
  area: [[21, 0], [39, 0], [39, 6], [22, 26], [16, 23], [2, 12], [0, 7]],
  dots: [[22, 0, 6], [29, 0, 1], [31, 0, 1], [33, 0, 5], [20, 1, 1], [22, 1, 1], [24, 1, 2], [27, 1, 13], [17, 2, 1], [20, 2, 5], [26, 2, 13], [13, 3, 1], [19, 3, 1], [21, 3, 3], [26, 3, 14], [14, 4, 1], [16, 4, 4], [21, 4, 3], [29, 4, 11], [12, 5, 3], [16, 5, 1], [18, 5, 1], [20, 5, 3], [24, 5, 1], [30, 5, 8], [14, 6, 3], [19, 6, 1], [22, 6, 4], [31, 6, 8], [0, 7, 15], [16, 7, 1], [18, 7, 4], [24, 7, 2], [30, 7, 7], [2, 8, 20], [24, 8, 3], [29, 8, 5], [2, 9, 20], [24, 9, 2], [30, 9, 3], [1, 10, 18], [23, 10, 2], [31, 10, 1], [2, 11, 2], [8, 11, 11], [23, 11, 2], [26, 11, 1], [2, 12, 1], [8, 12, 13], [24, 12, 3], [10, 13, 12], [23, 13, 5], [11, 14, 17], [11, 15, 9], [21, 15, 6], [28, 15, 2], [11, 16, 11], [23, 16, 4], [11, 17, 14], [12, 18, 11], [12, 19, 12], [13, 20, 9], [15, 21, 3], [22, 21, 1], [16, 22, 2], [16, 23, 2], [20, 23, 1], [23, 23, 1], [18, 24, 3], [21, 25, 1], [22, 26, 1]]
}]; // FACTOR is the distance in pixels between coordinates

var FACTOR = 10;

var maxCoordinate = function maxCoordinate(a, b) {
  return [Math.max(a[0], b[0]), Math.max(a[1], b[1])];
}; // const minCoordinate = (a, b) =>
//   [Math.min(a[0], b[0]), Math.min(a[1], b[1])];
// Based on https://stackoverflow.com/a/43861247


var MAP_LAT_BOTTOM = -50.0; // empirically determined

var MAP_LAT_BOTTOM_RAD = MAP_LAT_BOTTOM * Math.PI / 180;
var MAP_LON_LEFT = -171.0; // empirically determined

var MAP_LON_RIGHT = 184.0; // empirically determined

var MAP_LON_DELTA = MAP_LON_RIGHT - MAP_LON_LEFT;

var mapValues = function mapValues(extent) {
  var mapRadius = extent[0] / MAP_LON_DELTA * 360 / (2 * Math.PI);
  var mapOffsetY = Math.round(mapRadius / 2 * Math.log((1 + Math.sin(MAP_LAT_BOTTOM_RAD)) / (1 - Math.sin(MAP_LAT_BOTTOM_RAD))));
  return {
    mapRadius: mapRadius,
    mapOffsetY: mapOffsetY
  };
};

var latLonToCoord = function latLonToCoord(latLon, origin, extent) {
  var _mapValues = mapValues(extent),
      mapRadius = _mapValues.mapRadius,
      mapOffsetY = _mapValues.mapOffsetY;

  var x = Math.round((latLon[1] - MAP_LON_LEFT) * extent[0] / MAP_LON_DELTA);
  var latitudeRad = latLon[0] * Math.PI / 180;
  var y = extent[1] + mapOffsetY - Math.round(mapRadius / 2 * Math.log((1 + Math.sin(latitudeRad)) / (1 - Math.sin(latitudeRad))));
  return [x, y]; // the coordinate value of this point on the map image
};

var coordToLatLon = function coordToLatLon(coord, origin, extent) {
  var _mapValues2 = mapValues(extent),
      mapRadius = _mapValues2.mapRadius,
      mapOffsetY = _mapValues2.mapOffsetY;

  var a = (extent[1] + mapOffsetY - coord[1]) / mapRadius;
  var lat = 180 / Math.PI * (2 * Math.atan(Math.exp(a)) - Math.PI / 2);
  var lon = coord[0] * MAP_LON_DELTA / extent[0] + MAP_LON_LEFT;
  return [lat, lon];
};

var buildContinentState = function buildContinentState(_ref) {
  var area = _ref.area,
      dots = _ref.dots,
      origin = _ref.origin;
  var extent = [].concat(origin);
  var stateDots = dots.map(function (segment) {
    var count = segment[2];
    var spots = [];

    for (var i = 0; i < count; i += 1) {
      spots.push('h0');
    }

    var dotCommands = spots.join(' m10,0 ');
    var x = FACTOR * (origin[0] + segment[0] + 1);
    var y = FACTOR * (origin[1] + segment[1] + 1);
    extent = maxCoordinate(extent, [origin[0] + segment[0] + segment[2], origin[1] + segment[1]]);
    return "M" + x + "," + y + " " + dotCommands;
  }).join(' ');
  var stateArea = area.map(function (point, index) {
    var x = FACTOR * (point[0] + origin[0] + 1);
    var y = FACTOR * (point[1] + origin[1] + 1);
    return "" + (index === 0 ? 'M' : 'L') + x + "," + y;
  }).join(' ') + " Z";
  var mid = [origin[0] + (extent[0] - origin[0]) / 2, origin[1] + (extent[1] - origin[1]) / 2];
  return {
    area: stateArea,
    dots: stateDots,
    origin: origin,
    extent: extent,
    mid: mid
  };
};

var buildState = function buildState() {
  var continents = {}; // Build the SVG paths describing the individual dots

  var origin = [0, 0];
  var extent = [0, 0];
  CONTINENTS.forEach(function (continent) {
    continents[continent.name] = buildContinentState(continent);
    extent = maxCoordinate(extent, continents[continent.name].extent);
  });
  return {
    continents: continents,
    extent: extent,
    origin: origin,
    x: origin[0] * FACTOR,
    y: origin[1] * FACTOR,
    width: (extent[0] - origin[0] + 1) * FACTOR,
    height: (extent[1] - origin[1] + 2) * FACTOR
  };
};

var updateState = function updateState(state, _ref2) {
  var continents = _ref2.continents,
      places = _ref2.places;

  var nextState = _extends({}, state);

  if (continents) {
    continents.forEach(function (continent) {
      nextState.continents[continent.name] = _extends({}, state.continents[continent.name], continent);
    });
  }

  nextState.places = (places || []).map(function (_ref3) {
    var location = _ref3.location,
        place = _objectWithoutPropertiesLoose(_ref3, ["location"]);

    var coords = latLonToCoord(location, state.origin, state.extent);
    return _extends({
      coords: coords,
      key: location.join(',')
    }, place);
  });
  return nextState;
};

var buildInteractiveProps = function buildInteractiveProps(_ref4, activeFunc, active) {
  var name = _ref4.name,
      onClick = _ref4.onClick,
      onHover = _ref4.onHover;
  return {
    role: 'button',
    'aria-label': name,
    tabIndex: '0',
    onClick: onClick ? function () {
      return onClick(name);
    } : undefined,
    onMouseOver: function onMouseOver() {
      if (!active) {
        activeFunc(name);

        if (onHover) {
          onHover(true);
        }
      }
    },
    onMouseLeave: function onMouseLeave() {
      if (active) {
        activeFunc(undefined);

        if (onHover) {
          onHover(false);
        }
      }
    },
    onFocus: function onFocus() {
      // This moves the map unnecessarily. Instead, we should check
      // the position and scroll if it isn't already visible
      // this._worldMapRef.scrollIntoView();
      if (!active) {
        activeFunc(name);
      }
    },
    onBlur: function onBlur() {
      if (active) {
        activeFunc(undefined);
      }
    }
  };
};

var WorldMap =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(WorldMap, _Component);

  function WorldMap() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {});

    _defineProperty(_assertThisInitialized(_this), "onMouseOver", function () {
      // track when we're over the map to avoid dealing with mouse moves
      _this.setState({
        over: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseMove", function (event) {
      var width = _this.state.width; // determine the map coordinates for where the mouse is
      // containerRef uses the group so we can handle aspect ratio scaling

      var rect = _this.containerRef.getBoundingClientRect();

      var scale = rect.width / width; // since the SVG viewBox might be scaled

      var coords = [Math.round((event.clientX - rect.left) / scale / FACTOR), Math.round((event.clientY - rect.top) / scale / FACTOR)];

      _this.setState({
        activeCoords: coords
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onMouseLeave", function () {
      _this.setState({
        over: false,
        activeCoords: undefined
      });
    });

    return _this;
  }

  WorldMap.getDerivedStateFromProps = function getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.continents) {
      return updateState(buildState(), nextProps);
    }

    return updateState(prevState, nextProps);
  };

  var _proto = WorldMap.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        color = _this$props.color,
        onSelectPlace = _this$props.onSelectPlace,
        hoverColor = _this$props.hoverColor,
        theme = _this$props.theme,
        rest = _objectWithoutPropertiesLoose(_this$props, ["color", "onSelectPlace", "hoverColor", "theme"]);

    delete rest.places;
    delete rest.continents;
    var _this$state = this.state,
        activeContinent = _this$state.activeContinent,
        activeCoords = _this$state.activeCoords,
        activePlace = _this$state.activePlace,
        continentStates = _this$state.continents,
        extent = _this$state.extent,
        origin = _this$state.origin,
        over = _this$state.over,
        placeStates = _this$state.places,
        x = _this$state.x,
        y = _this$state.y,
        width = _this$state.width,
        height = _this$state.height;
    var continents = Object.keys(continentStates).map(function (name) {
      var _continentStates$name = continentStates[name],
          area = _continentStates$name.area,
          continentColor = _continentStates$name.color,
          dots = _continentStates$name.dots,
          onClick = _continentStates$name.onClick,
          onHover = _continentStates$name.onHover;
      var active = activeContinent && activeContinent === name;
      var interactiveProps = {};

      if (onClick || onHover) {
        interactiveProps = buildInteractiveProps(continentStates[name], function (activate) {
          return _this2.setState({
            activeContinent: activate
          });
        }, active);
      }

      return React.createElement("g", _extends({
        key: name
      }, interactiveProps), React.createElement("path", {
        stroke: "none",
        fill: "#fff",
        fillOpacity: "0.01",
        d: area
      }), React.createElement("path", {
        d: dots,
        strokeLinecap: "round",
        strokeWidth: parseMetricToNum(theme.worldMap.continent[active ? 'active' : 'base']),
        stroke: normalizeColor(continentColor || color || theme.worldMap.color, theme)
      }));
    });
    var places = placeStates.map(function (place) {
      var placeColor = place.color,
          coords = place.coords,
          key = place.key,
          name = place.name,
          onClick = place.onClick,
          onHover = place.onHover,
          restPlace = _objectWithoutPropertiesLoose(place, ["color", "coords", "key", "name", "onClick", "onHover"]);

      var d = "M" + FACTOR * coords[0] + ", " + FACTOR * coords[1] + " h0";
      var active = activePlace && activePlace === name;
      var interactiveProps = {};

      if (onClick || onHover) {
        interactiveProps = buildInteractiveProps(place, function (activate) {
          return _this2.setState({
            activePlace: activate
          });
        }, active);
      }

      return React.createElement("path", _extends({
        key: key,
        strokeLinecap: "round",
        strokeWidth: parseMetricToNum(theme.worldMap.place[active ? 'active' : 'base']),
        stroke: normalizeColor(placeColor || color || theme.worldMap.color, theme)
      }, interactiveProps, restPlace, {
        d: d
      }));
    }); // If the caller is interested in onSelectPlace changes, track where the

    var interactiveProps = {};

    if (onSelectPlace) {
      interactiveProps = {
        onMouseOver: this.onMouseOver,
        onMouseMove: over ? this.onMouseMove : undefined,
        onMouseLeave: this.onMouseLeave
      };
    }

    var active;

    if (activeCoords) {
      var d = "M" + FACTOR * activeCoords[0] + ", " + FACTOR * activeCoords[1] + " h0";
      active = React.createElement("g", {
        stroke: "none",
        fill: "none",
        fillRule: "evenodd",
        onClick: function onClick() {
          return onSelectPlace(coordToLatLon(activeCoords, origin, extent));
        }
      }, React.createElement("path", {
        strokeLinecap: "round",
        strokeWidth: parseMetricToNum(theme.worldMap.place.active),
        stroke: normalizeColor(hoverColor || color || theme.worldMap.hover.color, theme),
        d: d
      }));
    }

    return React.createElement(StyledWorldMap, _extends({
      viewBox: x + " " + y + " " + width + " " + height,
      preserveAspectRatio: "xMinYMin meet",
      width: width,
      height: height
    }, interactiveProps, rest), React.createElement("g", {
      ref: function ref(_ref5) {
        _this2.containerRef = _ref5;
      },
      stroke: "none",
      fill: "none",
      fillRule: "evenodd"
    }, continents), places, active);
  };

  return WorldMap;
}(Component);

WorldMap.defaultProps = {};
Object.setPrototypeOf(WorldMap.defaultProps, defaultProps);
var WorldMapDoc;

if (process.env.NODE_ENV !== 'production') {
  WorldMapDoc = require('./doc').doc(WorldMap); // eslint-disable-line global-require
}

var WorldMapWrapper = compose(withTheme)(WorldMapDoc || WorldMap);
export { WorldMapWrapper as WorldMap };