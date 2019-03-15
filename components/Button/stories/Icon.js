"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IconPlain = function IconPlain() {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react.default.createElement(_grommet.Text, {
    margin: "small"
  }, " plain=true (no padding, no border) "), _react.default.createElement(_grommet.Box, {
    direction: "row"
  }, _react.default.createElement(_grommet.Button, {
    plain: true,
    icon: _react.default.createElement(_grommetIcons.Close, null),
    onClick: function onClick() {},
    primary: true
  }), _react.default.createElement(_grommet.Button, {
    plain: true,
    icon: _react.default.createElement(_grommetIcons.Send, null),
    onClick: function onClick() {}
  }), _react.default.createElement(_grommet.Button, {
    plain: true,
    icon: _react.default.createElement(_grommetIcons.User, null),
    onClick: function onClick() {}
  }))), _react.default.createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react.default.createElement(_grommet.Text, {
    margin: "small"
  }, " plain=false (includes padding and border)"), _react.default.createElement(_grommet.Box, {
    direction: "row"
  }, _react.default.createElement(_grommet.Button, {
    plain: false,
    icon: _react.default.createElement(_grommetIcons.Close, null),
    onClick: function onClick() {},
    primary: true
  }), _react.default.createElement(_grommet.Button, {
    plain: false,
    icon: _react.default.createElement(_grommetIcons.Send, null),
    onClick: function onClick() {}
  }), _react.default.createElement(_grommet.Button, {
    plain: false,
    icon: _react.default.createElement(_grommetIcons.User, null),
    onClick: function onClick() {}
  }))), _react.default.createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react.default.createElement(_grommet.Text, {
    margin: "small"
  }, " plain=undefined (with padding, no border) "), _react.default.createElement(_grommet.Box, {
    direction: "row"
  }, _react.default.createElement(_grommet.Button, {
    icon: _react.default.createElement(_grommetIcons.Close, null),
    onClick: function onClick() {},
    primary: true
  }), _react.default.createElement(_grommet.Button, {
    icon: _react.default.createElement(_grommetIcons.Send, null),
    onClick: function onClick() {}
  }), _react.default.createElement(_grommet.Button, {
    icon: _react.default.createElement(_grommetIcons.User, null),
    onClick: function onClick() {}
  }))));
};

(0, _react2.storiesOf)('Button', module).add('Icon Plain', function () {
  return _react.default.createElement(IconPlain, null);
});