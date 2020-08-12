"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _grommetIcons = require("grommet-icons");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var data = [];

for (var i = 0; i < 40; i += 1) {
  data.push({
    entry: "entry-" + (i + 1)
  });
}

var ActionList = function ActionList() {
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.List, {
    data: data.slice(0, 10),
    pad: {
      left: 'small',
      right: 'none'
    },
    action: function action(item, index) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Menu, {
        key: index,
        icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.More, null),
        hoverIndicator: true,
        items: [{
          label: 'one'
        }]
      });
    }
  })));
};

(0, _react2.storiesOf)('List', module).add('action', function () {
  return /*#__PURE__*/_react["default"].createElement(ActionList, null);
});