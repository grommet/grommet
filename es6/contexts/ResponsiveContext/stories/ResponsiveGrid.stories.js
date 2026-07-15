var _excluded = ["children", "areas"];
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
import React from 'react';
import { deepMerge } from 'grommet/utils';
import { grommet } from 'grommet/themes';
import { Box, Grid, Paragraph, Grommet, ResponsiveContext } from 'grommet';
var customBreakpoints = deepMerge(grommet, {
  global: {
    breakpoints: {
      xsmall: {
        value: 500
      },
      small: {
        value: 900
      },
      medium: undefined,
      middle: {
        value: 3000
      }
    }
  }
});
var ResponsiveGrid = function ResponsiveGrid(_ref) {
  var children = _ref.children,
    areas = _ref.areas,
    props = _objectWithoutPropertiesLoose(_ref, _excluded);
  var size = React.useContext(ResponsiveContext);
  return /*#__PURE__*/React.createElement(Grid, _extends({
    areas: areas[size]
  }, props), children);
};
export var ResponsiveGridExample = function ResponsiveGridExample() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: customBreakpoints,
    full: true
  }, /*#__PURE__*/React.createElement(ResponsiveGrid, {
    columns: ['25%', '25%', '25%', '25%'],
    rows: ['3em', '3em', '3em'],
    areas: {
      xsmall: [{
        name: 'header',
        start: [0, 0],
        end: [3, 0]
      }, {
        name: 'one',
        start: [0, 1],
        end: [1, 1]
      }, {
        name: 'two',
        start: [2, 1],
        end: [3, 1]
      }, {
        name: 'three',
        start: [0, 2],
        end: [3, 2]
      }],
      small: [{
        name: 'header',
        start: [0, 0],
        end: [3, 0]
      }, {
        name: 'one',
        start: [0, 1],
        end: [1, 1]
      }, {
        name: 'two',
        start: [2, 1],
        end: [3, 1]
      }, {
        name: 'three',
        start: [0, 2],
        end: [3, 2]
      }],
      medium: [{
        name: 'header',
        start: [0, 0],
        end: [3, 0]
      }, {
        name: 'one',
        start: [0, 1],
        end: [0, 1]
      }, {
        name: 'two',
        start: [1, 1],
        end: [2, 1]
      }, {
        name: 'three',
        start: [3, 1],
        end: [3, 1]
      }],
      middle: [{
        name: 'header',
        start: [0, 0],
        end: [3, 0]
      }, {
        name: 'one',
        start: [0, 1],
        end: [0, 1]
      }, {
        name: 'two',
        start: [1, 1],
        end: [2, 1]
      }, {
        name: 'three',
        start: [3, 1],
        end: [3, 1]
      }]
    }
  }, /*#__PURE__*/React.createElement(Box, {
    gridArea: "header",
    background: "brand"
  }), /*#__PURE__*/React.createElement(Box, {
    gridArea: "one",
    background: "dark-1"
  }), /*#__PURE__*/React.createElement(Box, {
    gridArea: "two",
    background: "dark-2"
  }), /*#__PURE__*/React.createElement(Box, {
    gridArea: "three",
    background: "dark-3"
  })), /*#__PURE__*/React.createElement(Paragraph, null, "Below a certain threshold, Columns 1 & 2 switch to 50% and Column 3 moves down to a new spot in the grid."));
};
ResponsiveGridExample.storyName = 'Responsive grid';
export default {
  title: 'Utilities/ResponsiveContext/Responsive grid'
};