function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Button, Grid, Text, Heading, ResponsiveContext } from 'grommet';
import { grommet } from 'grommet/themes';
import { deepMerge } from 'grommet/utils';

var AppGrid =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(AppGrid, _Component);

  function AppGrid() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;

    _defineProperty(_assertThisInitialized(_this), "state", {
      sidebar: true
    });

    return _this;
  }

  var _proto = AppGrid.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var sidebar = this.state.sidebar;
    return React.createElement(Grommet, {
      full: true,
      theme: grommet
    }, React.createElement(Grid, {
      fill: true,
      rows: ['auto', 'flex'],
      columns: ['auto', 'flex'],
      areas: [{
        name: 'header',
        start: [0, 0],
        end: [1, 0]
      }, {
        name: 'sidebar',
        start: [0, 1],
        end: [0, 1]
      }, {
        name: 'main',
        start: [1, 1],
        end: [1, 1]
      }]
    }, React.createElement(Box, {
      gridArea: "header",
      direction: "row",
      align: "center",
      justify: "between",
      pad: {
        horizontal: 'medium',
        vertical: 'small'
      },
      background: "dark-2"
    }, React.createElement(Button, {
      onClick: function onClick() {
        return _this2.setState({
          sidebar: !sidebar
        });
      }
    }, React.createElement(Text, {
      size: "large"
    }, "Title")), React.createElement(Text, null, "my@email")), sidebar && React.createElement(Box, {
      gridArea: "sidebar",
      background: "dark-3",
      width: "small",
      animation: [{
        type: 'fadeIn',
        duration: 300
      }, {
        type: 'slideRight',
        size: 'xlarge',
        duration: 150
      }]
    }, ['First', 'Second', 'Third'].map(function (name) {
      return React.createElement(Button, {
        key: name,
        href: "#",
        hoverIndicator: true
      }, React.createElement(Box, {
        pad: {
          horizontal: 'medium',
          vertical: 'small'
        }
      }, React.createElement(Text, null, name)));
    })), React.createElement(Box, {
      gridArea: "main",
      justify: "center",
      align: "center"
    }, React.createElement(Text, null, "main"))));
  };

  return AppGrid;
}(Component);

var Percentages = function Percentages() {
  return React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, React.createElement(Grid, {
    fill: true,
    areas: [{
      name: 'nav',
      start: [0, 0],
      end: [0, 0]
    }, {
      name: 'main',
      start: [1, 0],
      end: [1, 0]
    }],
    columns: ['small', 'flex'],
    rows: ['flex'],
    gap: "small"
  }, React.createElement(Box, {
    gridArea: "nav",
    background: "brand"
  }), React.createElement(Box, {
    gridArea: "main",
    background: "brand"
  })));
};

var NColumnGrid = function NColumnGrid() {
  return React.createElement(Grommet, {
    theme: grommet,
    full: true
  }, React.createElement(Grid, {
    columns: {
      count: 6,
      size: 'auto'
    },
    gap: "small"
  }, React.createElement(Box, {
    background: "brand"
  }, "Item 1"), React.createElement(Box, {
    background: "brand"
  }, "Item 2"), React.createElement(Box, {
    background: "brand"
  }, "Item 3"), React.createElement(Box, {
    background: "brand"
  }, "Item 4"), React.createElement(Box, {
    background: "brand"
  }, "Item 5"), React.createElement(Box, {
    background: "brand"
  }, "Item 6")));
}; // Two responsive grids
//    - First one with a known number of elements
//    - Second one with an unknown number of elements
// set custom breakpoints so we can see the changes


var customBreakpoints = deepMerge(grommet, {
  global: {
    breakpoints: {
      small: {
        value: 600
      },
      medium: {
        value: 900
      },
      large: 3000
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
}; // set the different areas you need for every size

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
}; // let's say this is returned from an API

var animals = ['dog', 'cat', 'pig', 'cow', 'giraffe', 'elephant', 'dinosaur', 'chicken', 'duck', 'tiger', 'lion', 'cheetah']; // Create box for each animal

var listAnimalsBoxes = animals.map(function (animalName) {
  return React.createElement(Box, {
    elevation: "large",
    key: animalName,
    background: "light-3",
    flex: false,
    justify: "center",
    align: "center"
  }, React.createElement(Heading, {
    level: 2
  }, animalName));
});

var Responsive = function Responsive(_ref) {
  var children = _ref.children,
      overrideColumns = _ref.overrideColumns,
      overrideRows = _ref.overrideRows,
      areas = _ref.areas,
      props = _objectWithoutPropertiesLoose(_ref, ["children", "overrideColumns", "overrideRows", "areas"]);

  return React.createElement(ResponsiveContext.Consumer, null, function (size) {
    // take into consideration if not array is sent but a simple string
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
    } // also if areas is a simple array not an object of arrays for different sizes


    var areasVal = areas;
    if (areas && !Array.isArray(areas)) areasVal = areas[size];
    return React.createElement(Grid, _extends({}, props, {
      areas: !areasVal ? undefined : areasVal,
      rows: !rowsVal ? size : rowsVal,
      columns: !columnsVal ? size : columnsVal
    }), children);
  });
};

var ResponsiveGrid = function ResponsiveGrid() {
  return React.createElement(Grommet, {
    theme: customBreakpoints
  }, React.createElement(Box, null, React.createElement(Heading, {
    level: 2
  }, "Resize me."), React.createElement(Responsive, {
    rows: rows,
    columns: columns,
    gap: "small",
    areas: fixedGridAreas,
    margin: "medium"
  }, React.createElement(Box, {
    gridArea: "header",
    background: "neutral-2",
    justify: "center",
    align: "center"
  }, React.createElement("strong", null, "Box 1")), React.createElement(Box, {
    gridArea: "test",
    background: "neutral-3",
    justify: "center",
    align: "center"
  }, React.createElement("strong", null, "Box 2")), React.createElement(Box, {
    gridArea: "test1",
    background: "neutral-4",
    justify: "center",
    align: "center"
  }, React.createElement("strong", null, "Box 3"))), React.createElement(Responsive, {
    gap: "small",
    margin: "medium",
    columns: "medium",
    rows: "xsmall"
  }, listAnimalsBoxes)));
};

storiesOf('Grid', module).add('App', function () {
  return React.createElement(AppGrid, null);
}).add('Percentages', function () {
  return React.createElement(Percentages, null);
}).add('N-column layout', function () {
  return React.createElement(NColumnGrid, null);
}).add('Responsive Grid', function () {
  return React.createElement(ResponsiveGrid, null);
});