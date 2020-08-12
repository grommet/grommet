"use strict";

var _react = _interopRequireDefault(require("react"));

var _react2 = require("@storybook/react");

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var data = [];

for (var i = 0; i < 40; i += 1) {
  data.push({
    entry: "entry-" + (i + 1)
  });
}

var SelectionList = function SelectionList() {
  var _ref;

  var _React$useState = _react["default"].useState(),
      selected = _React$useState[0],
      setSelected = _React$useState[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.List, {
    data: data.slice(0, 10),
    itemProps: selected >= 0 ? (_ref = {}, _ref[selected] = {
      background: 'brand'
    }, _ref) : undefined,
    onClickItem: function onClickItem(event) {
      return setSelected(selected === event.index ? undefined : event.index);
    }
  })));
};

(0, _react2.storiesOf)('List', module).add('selection', function () {
  return /*#__PURE__*/_react["default"].createElement(SelectionList, null);
});