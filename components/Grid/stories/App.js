"use strict";

var _react = _interopRequireWildcard(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var AppGrid = function AppGrid() {
  var _useState = (0, _react.useState)(true),
      sidebar = _useState[0],
      setSidebar = _useState[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    full: true,
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
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
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    gridArea: "header",
    direction: "row",
    align: "center",
    justify: "between",
    pad: {
      horizontal: 'medium',
      vertical: 'small'
    },
    background: "dark-2"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
    onClick: function onClick() {
      return setSidebar(!sidebar);
    }
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    size: "large"
  }, "Title")), /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "my@email")), sidebar && /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
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
    return /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      key: name,
      href: "#",
      hoverIndicator: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      pad: {
        horizontal: 'medium',
        vertical: 'small'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, name)));
  })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    gridArea: "main",
    justify: "center",
    align: "center"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "main"))));
};

(0, _react2.storiesOf)('Grid', module).add('App', function () {
  return /*#__PURE__*/_react["default"].createElement(AppGrid, null);
});