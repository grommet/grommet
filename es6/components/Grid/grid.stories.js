function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import { Grommet, Box, Button, Grid, Text } from 'grommet';
import { grommet } from 'grommet/themes';

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
};

storiesOf('Grid', module).add('App', function () {
  return React.createElement(AppGrid, null);
}).add('Percentages', function () {
  return React.createElement(Percentages, null);
}).add('N-column layout', function () {
  return React.createElement(NColumnGrid, null);
});