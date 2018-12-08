"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommetIcons = require("grommet-icons");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _react2.storiesOf)('Anchor', module).add('Default', function () {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react.default.createElement(_grommet.Anchor, {
    href: "#"
  }, "Link")));
}).add('Colors', function () {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Box, {
    pad: "medium",
    gap: "medium"
  }, _react.default.createElement(_grommet.Anchor, {
    icon: _react.default.createElement(_grommetIcons.Add, null),
    href: "#"
  }), _react.default.createElement(_grommet.Anchor, {
    icon: _react.default.createElement(_grommetIcons.Add, null),
    label: "Add",
    href: "#"
  }), _react.default.createElement(_grommet.Anchor, {
    label: "Add",
    href: "#"
  })), _react.default.createElement(_grommet.Box, {
    background: "dark-1",
    pad: "medium",
    gap: "medium"
  }, _react.default.createElement(_grommet.Anchor, {
    icon: _react.default.createElement(_grommetIcons.Add, null),
    href: "#"
  }), _react.default.createElement(_grommet.Anchor, {
    icon: _react.default.createElement(_grommetIcons.Add, null),
    label: "Add",
    href: "#"
  }), _react.default.createElement(_grommet.Anchor, {
    icon: _react.default.createElement(_grommetIcons.Add, null),
    label: "Add",
    href: "#"
  }), _react.default.createElement(_grommet.Anchor, {
    label: "Add",
    href: "#"
  })));
}).add('Size', function () {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, ['xxlarge', 'xlarge', 'large', 'medium', 'small', 'xsmall'].map(function (size) {
    return _react.default.createElement(_grommet.Box, {
      key: size,
      margin: "small"
    }, _react.default.createElement(_grommet.Anchor, {
      size: size,
      label: size,
      href: "#"
    }));
  })));
}).add('Inline', function () {
  return _react.default.createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, _react.default.createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, _react.default.createElement(_grommet.Paragraph, null, "This is ", _react.default.createElement(_grommet.Anchor, {
    label: "an inline link",
    href: "#"
  }), " with surrounding text.")));
});