function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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
      props = _objectWithoutPropertiesLoose(_ref, ["children", "areas"]);

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