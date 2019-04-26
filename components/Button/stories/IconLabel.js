"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IconLabel = function IconLabel() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react.default.createElement(_grommet.Box, {
    round: "full",
    overflow: "hidden",
    background: "neutral-1"
  }, _react.default.createElement(_grommet.Button, {
    icon: _react.default.createElement(_grommetIcons.Add, null),
    hoverIndicator: true,
    onClick: function onClick() {}
  })), _react.default.createElement(_grommet.Box, {
    align: "center",
    pad: "large",
    gap: "small"
  }, _react.default.createElement(_grommet.Button, {
    icon: _react.default.createElement(_grommetIcons.Add, null),
    label: "Add",
    onClick: function onClick() {},
    primary: true
  }), _react.default.createElement(_grommet.Button, {
    icon: _react.default.createElement(_grommetIcons.Add, null),
    label: "Add",
    onClick: function onClick() {}
  }), _react.default.createElement(_grommet.Button, {
    icon: _react.default.createElement(_grommetIcons.Add, null),
    label: "Add",
    gap: "xlarge",
    onClick: function onClick() {}
  }), _react.default.createElement(_grommet.Button, {
    icon: _react.default.createElement(_grommetIcons.Add, null),
    label: "500px gap",
    gap: "500px",
    onClick: function onClick() {}
  }))));
};

(0, _react2.storiesOf)('Button', module).add('Icon Label', function () {
  return _react.default.createElement(IconLabel, null);
});