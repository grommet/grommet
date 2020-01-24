"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CollapsableNav = function CollapsableNav() {
  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Header, {
    background: "dark-1",
    pad: "medium"
  }, _react["default"].createElement(_grommet.Box, {
    direction: "row",
    align: "center",
    gap: "small"
  }, "Resize the page to collapse the Nav into a Menu"), _react["default"].createElement(_grommet.ResponsiveContext.Consumer, null, function (responsive) {
    return responsive === 'small' ? _react["default"].createElement(_grommet.Menu, {
      label: "Click me",
      items: [{
        label: 'This is',
        onClick: function onClick() {}
      }, {
        label: 'The Menu',
        onClick: function onClick() {}
      }, {
        label: 'Component',
        onClick: function onClick() {}
      }]
    }) : _react["default"].createElement(_grommet.Nav, {
      direction: "row"
    }, _react["default"].createElement(_grommet.Anchor, {
      href: "#",
      label: "This is"
    }), _react["default"].createElement(_grommet.Anchor, {
      href: "#",
      label: "The Nav"
    }), _react["default"].createElement(_grommet.Anchor, {
      href: "#",
      label: "Component"
    }));
  })));
};

(0, _react2.storiesOf)('ResponsiveContext', module).add('Collapsable Nav', function () {
  return _react["default"].createElement(CollapsableNav, null);
});