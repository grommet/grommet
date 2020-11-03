"use strict";

exports.__esModule = true;
exports.WorldMap = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("styled-components");

var _defaultProps = require("../../default-props");

var _utils = require("../../utils");

var _StyledWorldMap = require("./StyledWorldMap");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// The graphic is drawn as a rectangular grid using coordinates spaced
// by FACTOR pixels. The contents have both an area boundary for interaction
// and dots described as rows where each row is described by three values:
// a starting coordinate and a length. This approach is more efficient than
// describing it via SVG elements, keeping the code/library size smaller.
var CONTINENTS = [{
  name: 'Australia',
  origin: [74, 32],
  area: [[4, 0], [7, 1], [15, 7], [13, 9], [8, 8], [0, 6], [0, 2]],
  dots: [[4, 0, 1], [2, 1, 6], [0, 2, 9], [0, 3, 10], [0, 4, 10], [0, 5, 3], [5, 5, 5], [5, 6, 4], [8, 8, 1], [15, 7, 1], [14, 8, 1], [13, 9, 1]]
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

var buildContinent = function buildContinent(_ref) {
  var area = _ref.area,
      dots = _ref.dots,
      name = _ref.name,
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
    name: name,
    origin: origin,
    extent: extent,
    mid: mid
  };
};

var buildWorld = function buildWorld() {
  // Build the SVG paths describing the individual dots
  var continents = CONTINENTS.map(buildContinent);
  var origin = [0, 0];
  var extent = [0, 0];
  continents.forEach(function (continent) {
    extent = maxCoordinate(extent, continent.extent);
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

var buildInteractiveProps = function buildInteractiveProps(_ref2, activeFunc, active) {
  var name = _ref2.name,
      onClick = _ref2.onClick,
      onHover = _ref2.onHover;
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

var WorldMap = /*#__PURE__*/(0, _react.forwardRef)(function (_ref3, ref) {
  var fill = _ref3.fill,
      color = _ref3.color,
      continentsProp = _ref3.continents,
      hoverColor = _ref3.hoverColor,
      onSelectPlace = _ref3.onSelectPlace,
      placesProp = _ref3.places,
      rest = _objectWithoutPropertiesLoose(_ref3, ["fill", "color", "continents", "hoverColor", "onSelectPlace", "places"]);

  var theme = _react["default"].useContext(_styledComponents.ThemeContext);

  var world = _react["default"].useMemo(buildWorld, []);

  var _React$useState = _react["default"].useState({}),
      continents = _React$useState[0],
      setContinents = _React$useState[1];

  _react["default"].useEffect(function () {
    if (continentsProp) {
      setContinents(continentsProp.reduce(function (obj, continent) {
        // eslint-disable-next-line no-param-reassign
        obj[continent.name] = continent;
        return obj;
      }, {}));
    } else setContinents({});
  }, [continentsProp]);

  var _React$useState2 = _react["default"].useState([]),
      places = _React$useState2[0],
      setPlaces = _React$useState2[1];

  _react["default"].useEffect(function () {
    if (placesProp) {
      setPlaces(placesProp.map(function (_ref4) {
        var location = _ref4.location,
            place = _objectWithoutPropertiesLoose(_ref4, ["location"]);

        var coords = latLonToCoord(location, world.origin, world.extent);
        return _extends({
          coords: coords,
          key: location.join(',')
        }, place);
      }));
    } else setPlaces([]);
  }, [placesProp, world]);

  var _React$useState3 = _react["default"].useState(),
      over = _React$useState3[0],
      setOver = _React$useState3[1];

  var _React$useState4 = _react["default"].useState(),
      activeCoords = _React$useState4[0],
      setActiveCoords = _React$useState4[1];

  var _React$useState5 = _react["default"].useState(),
      activeContinent = _React$useState5[0],
      setActiveContinent = _React$useState5[1];

  var _React$useState6 = _react["default"].useState(),
      activePlace = _React$useState6[0],
      setActivePlace = _React$useState6[1];

  var containerRef = _react["default"].useRef();

  var onMouseMove = _react["default"].useCallback(function (event) {
    // determine the map coordinates for where the mouse is
    // containerRef uses the group so we can handle aspect ratio scaling
    var rect = containerRef.current.getBoundingClientRect(); // since the SVG viewBox might be scaled

    var scale = rect.width / world.width;
    var coords = [Math.round((event.clientX - rect.left) / scale / FACTOR), Math.round((event.clientY - rect.top) / scale / FACTOR)];
    setActiveCoords(coords);
  }, [world.width]);

  var continentElements = world.continents.map(function (_ref5) {
    var area = _ref5.area,
        dots = _ref5.dots,
        name = _ref5.name;

    var _ref6 = continents[name] || {},
        continentColor = _ref6.color,
        onClick = _ref6.onClick,
        onHover = _ref6.onHover,
        restContinents = _objectWithoutPropertiesLoose(_ref6, ["color", "onClick", "onHover"]);

    var active = activeContinent && activeContinent === name;
    var interactiveProps = {};

    if (onClick || onHover) {
      interactiveProps = buildInteractiveProps(continents[name], function (activate) {
        return setActiveContinent(activate);
      }, active);
    }

    return /*#__PURE__*/_react["default"].createElement("g", _extends({
      key: name
    }, interactiveProps, restContinents), /*#__PURE__*/_react["default"].createElement("path", {
      stroke: "none",
      fill: "#fff",
      fillOpacity: "0.01",
      d: area
    }), /*#__PURE__*/_react["default"].createElement("path", {
      d: dots,
      strokeLinecap: "round",
      strokeWidth: (0, _utils.parseMetricToNum)(theme.worldMap.continent[active ? 'active' : 'base']),
      stroke: (0, _utils.normalizeColor)(continentColor || color || theme.worldMap.color, theme)
    }));
  });
  var placeElements = places.map(function (place) {
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
        return setActivePlace(activate);
      }, active);
    }

    return /*#__PURE__*/_react["default"].createElement("path", _extends({
      key: key,
      strokeLinecap: "round",
      strokeWidth: (0, _utils.parseMetricToNum)(theme.worldMap.place[active ? 'active' : 'base']),
      stroke: (0, _utils.normalizeColor)(placeColor || color || theme.worldMap.color, theme)
    }, interactiveProps, restPlace, {
      d: d
    }));
  }); // If the caller is interested in onSelectPlace changes, track where the

  var interactiveProps = {};

  if (onSelectPlace) {
    interactiveProps = {
      onMouseOver: function onMouseOver() {
        return setOver(true);
      },
      onMouseMove: over ? onMouseMove : undefined,
      onMouseLeave: function onMouseLeave() {
        setOver(false);
        setActiveCoords(undefined);
      }
    };
  }

  var active;

  if (activeCoords) {
    var d = "M" + FACTOR * activeCoords[0] + ", " + FACTOR * activeCoords[1] + " h0";
    active = /*#__PURE__*/_react["default"].createElement("g", {
      stroke: "none",
      fill: "none",
      fillRule: "evenodd",
      onClick: function onClick() {
        return onSelectPlace(coordToLatLon(activeCoords, world.origin, world.extent));
      }
    }, /*#__PURE__*/_react["default"].createElement("path", {
      strokeLinecap: "round",
      strokeWidth: (0, _utils.parseMetricToNum)(theme.worldMap.place.active),
      stroke: (0, _utils.normalizeColor)(hoverColor || color || theme.worldMap.hover.color, theme),
      d: d
    }));
  }

  return /*#__PURE__*/_react["default"].createElement(_StyledWorldMap.StyledWorldMap, _extends({
    ref: ref,
    viewBox: world.x + " " + world.y + " " + world.width + " " + world.height,
    preserveAspectRatio: "xMinYMin meet",
    fillProp: fill,
    width: world.width,
    height: world.height
  }, interactiveProps, rest), /*#__PURE__*/_react["default"].createElement("g", {
    ref: containerRef,
    stroke: "none",
    fill: "none",
    fillRule: "evenodd"
  }, continentElements), placeElements, active); // }
});
WorldMap.displayName = 'WorldMap';
WorldMap.defaultProps = {};
Object.setPrototypeOf(WorldMap.defaultProps, _defaultProps.defaultProps);
var WorldMapDoc;

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  WorldMapDoc = require('./doc').doc(WorldMap);
}

var WorldMapWrapper = WorldMapDoc || WorldMap;
exports.WorldMap = WorldMapWrapper;