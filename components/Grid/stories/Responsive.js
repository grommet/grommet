"use strict";

exports.__esModule = true;
exports.ResponsiveGrid = void 0;

var _react = _interopRequireDefault(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _utils = require("grommet/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// Two responsive grids
//    - First one with a known number of elements
//    - Second one with an unknown number of elements
// set custom breakpoints so we can see the changes
var customBreakpoints = (0, _utils.deepMerge)(_themes.grommet, {
  global: {
    breakpoints: {
      small: {
        value: 600
      },
      medium: {
        value: 900
      },
      large: {
        value: 3000
      }
    }
  }
}); // columns, rows and areas are for Grid with a known number of contents / boxes.
// If the size is small, we only see 1 column
// If the size is medium, we only see 2 columns
// If the size is either large or xlarge, we see 3 columns

var columns = {
  small: ['auto'],
  medium: ['auto', 'auto'],
  large: ['auto', 'auto', 'auto'],
  xlarge: ['auto', 'auto', 'auto']
}; // If the size is small, we have 3 rows
// If the size is medium, we have 2 rows
// If the size is large or xlarge, we have 1 row

var rows = {
  small: ['xsmall', 'xsmall', 'xsmall'],
  medium: ['xsmall', 'xsmall'],
  large: ['xsmall'],
  xlarge: ['xsmall']
}; // Set the different areas you need for every size

var fixedGridAreas = {
  small: [{
    name: 'header',
    start: [0, 0],
    end: [0, 0]
  }, {
    name: 'test',
    start: [0, 1],
    end: [0, 1]
  }, {
    name: 'test1',
    start: [0, 2],
    end: [0, 2]
  }],
  medium: [{
    name: 'header',
    start: [0, 0],
    end: [1, 0]
  }, {
    name: 'test',
    start: [0, 1],
    end: [0, 1]
  }, {
    name: 'test1',
    start: [1, 1],
    end: [1, 1]
  }],
  large: [{
    name: 'header',
    start: [0, 0],
    end: [0, 0]
  }, {
    name: 'test',
    start: [1, 0],
    end: [1, 0]
  }, {
    name: 'test1',
    start: [2, 0],
    end: [2, 0]
  }],
  xlarge: [{
    name: 'header',
    start: [0, 0],
    end: [0, 0]
  }, {
    name: 'test',
    start: [1, 0],
    end: [1, 0]
  }, {
    name: 'test1',
    start: [2, 0],
    end: [2, 0]
  }]
}; // Let's say this is returned from an API

var animals = ['dog', 'cat', 'pig', 'cow', 'giraffe', 'elephant', 'dinosaur', 'chicken', 'duck', 'tiger', 'lion', 'cheetah']; // Create box for each animal

var listAnimalsBoxes = animals.map(function (animalName) {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    elevation: "large",
    key: animalName,
    background: "light-3",
    flex: false,
    justify: "center",
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 2
  }, animalName));
});

var Responsive = function Responsive(_ref) {
  var children = _ref.children,
      overrideColumns = _ref.overrideColumns,
      overrideRows = _ref.overrideRows,
      areas = _ref.areas,
      props = _objectWithoutPropertiesLoose(_ref, ["children", "overrideColumns", "overrideRows", "areas"]);

  return /*#__PURE__*/_react["default"].createElement(_grommet.ResponsiveContext.Consumer, null, function (size) {
    // Take into consideration if not array is sent but a simple string
    var columnsVal = columns;

    if (columns) {
      if (columns[size]) {
        columnsVal = columns[size];
      }
    }

    var rowsVal = rows;

    if (rows) {
      if (rows[size]) {
        rowsVal = rows[size];
      }
    } // Also if areas is a simple array not an object of arrays for
    // different sizes


    var areasVal = areas;
    if (areas && !Array.isArray(areas)) areasVal = areas[size];
    return /*#__PURE__*/_react["default"].createElement(_grommet.Grid, _extends({}, props, {
      areas: !areasVal ? undefined : areasVal,
      rows: !rowsVal ? size : rowsVal,
      columns: !columnsVal ? size : columnsVal
    }), children);
  });
};

var ResponsiveGrid = function ResponsiveGrid() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customBreakpoints
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Heading, {
    level: 2
  }, "Resize me."), /*#__PURE__*/_react["default"].createElement(Responsive, {
    rows: rows,
    columns: columns,
    gap: "small",
    areas: fixedGridAreas,
    margin: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    gridArea: "header",
    background: "neutral-2",
    justify: "center",
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Box 1")), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    gridArea: "test",
    background: "neutral-3",
    justify: "center",
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Box 2")), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    gridArea: "test1",
    background: "neutral-4",
    justify: "center",
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement("strong", null, "Box 3"))), /*#__PURE__*/_react["default"].createElement(Responsive, {
    gap: "small",
    margin: "medium",
    columns: "medium",
    rows: "xsmall"
  }, listAnimalsBoxes)));
};

exports.ResponsiveGrid = ResponsiveGrid;
ResponsiveGrid.story = {
  name: 'Responsive grid'
};