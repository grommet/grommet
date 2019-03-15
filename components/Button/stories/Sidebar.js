"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SidebarButton = function SidebarButton(_ref) {
  var label = _ref.label,
      onClick = _ref.onClick;
  return _react.default.createElement(_grommet.Button, {
    plain: true,
    onClick: onClick
  }, function (_ref2) {
    var hover = _ref2.hover;
    return _react.default.createElement(_grommet.Box, {
      background: hover ? 'accent-1' : undefined,
      pad: {
        horizontal: 'large',
        vertical: 'medium'
      }
    }, _react.default.createElement(_grommet.Text, {
      size: "large"
    }, label));
  });
};

var SidebarButtons = function SidebarButtons() {
  return _react.default.createElement(_grommet.Grommet, {
    full: true,
    theme: _grommet.grommet
  }, _react.default.createElement(_grommet.Box, {
    fill: true,
    direction: "row"
  }, _react.default.createElement(_grommet.Box, {
    background: "neutral-1"
  }, _react.default.createElement(SidebarButton, {
    label: "Dashboard",
    onClick: function onClick() {}
  }), _react.default.createElement(SidebarButton, {
    label: "Devices",
    onClick: function onClick() {}
  }), _react.default.createElement(SidebarButton, {
    label: "Settings",
    onClick: function onClick() {}
  }))));
};

(0, _react2.storiesOf)('Button', module).add('Sidebar', function () {
  return _react.default.createElement(SidebarButtons, null);
});