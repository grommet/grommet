"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _grommetIcons = require("grommet-icons");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var SizedButton = function SizedButton() {
  return _react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react["default"].createElement(_grommet.Box, {
    direction: "row"
  }, _react["default"].createElement(_grommet.Box, {
    align: "start",
    pad: "large",
    gap: "large"
  }, _react["default"].createElement(_grommet.Button, {
    size: "small",
    label: "Small"
  }), _react["default"].createElement(_grommet.Button, {
    size: "medium",
    label: "Medium"
  }), _react["default"].createElement(_grommet.Button, {
    label: "Default"
  }), _react["default"].createElement(_grommet.Button, {
    size: "large",
    label: "Large"
  })), _react["default"].createElement(_grommet.Box, {
    align: "start",
    pad: "large",
    gap: "large"
  }, _react["default"].createElement(_grommet.Button, {
    primary: true,
    size: "small",
    label: "Small"
  }), _react["default"].createElement(_grommet.Button, {
    primary: true,
    size: "medium",
    label: "Medium"
  }), _react["default"].createElement(_grommet.Button, {
    primary: true,
    label: "Default"
  }), _react["default"].createElement(_grommet.Button, {
    primary: true,
    size: "large",
    label: "Large"
  })), _react["default"].createElement(_grommet.Box, {
    align: "start",
    pad: "large",
    gap: "large"
  }, _react["default"].createElement(_grommet.Button, {
    size: "small",
    label: "Small",
    icon: _react["default"].createElement(_grommetIcons.Next, null),
    reverse: true
  }), _react["default"].createElement(_grommet.Button, {
    size: "medium",
    label: "Medium",
    icon: _react["default"].createElement(_grommetIcons.Next, null),
    reverse: true
  }), _react["default"].createElement(_grommet.Button, {
    label: "Default",
    icon: _react["default"].createElement(_grommetIcons.Next, null),
    reverse: true
  }), _react["default"].createElement(_grommet.Button, {
    size: "large",
    label: "Large",
    icon: _react["default"].createElement(_grommetIcons.Next, null),
    reverse: true
  })), _react["default"].createElement(_grommet.Box, {
    align: "start",
    pad: "large",
    gap: "large"
  }, _react["default"].createElement(_grommet.Button, {
    size: "small",
    icon: _react["default"].createElement(_grommetIcons.Add, null),
    primary: true
  }), _react["default"].createElement(_grommet.Button, {
    size: "medium",
    icon: _react["default"].createElement(_grommetIcons.Add, null),
    primary: true
  }), _react["default"].createElement(_grommet.Button, {
    icon: _react["default"].createElement(_grommetIcons.Add, null),
    primary: true
  }), _react["default"].createElement(_grommet.Button, {
    size: "large",
    icon: _react["default"].createElement(_grommetIcons.Add, null),
    primary: true
  }))));
};

(0, _react2.storiesOf)('Button', module).add('Sizes', function () {
  return _react["default"].createElement(SizedButton, {
    active: true
  });
});