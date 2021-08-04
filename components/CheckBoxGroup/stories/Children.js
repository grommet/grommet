"use strict";

exports.__esModule = true;
exports["default"] = exports.Children = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

var _grommetIcons = require("grommet-icons");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var optionsObjects = [{
  label: 'asc',
  disabled: true,
  value: 'asc'
}, {
  label: 'desc',
  value: 'desc'
}];

var Children = function Children() {
  var _useState = (0, _react.useState)(),
      value = _useState[0],
      setValue = _useState[1];

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.CheckBoxGroup, {
    name: "checkbox",
    direction: "row",
    gap: "xsmall",
    options: optionsObjects,
    value: value,
    onChange: function onChange(_ref) {
      var nextValue = _ref.value;
      return setValue(nextValue);
    }
  }, function (option, _ref2) {
    var checked = _ref2.checked;
    var Icon = option.value === 'asc' ? _grommetIcons.Ascend : _grommetIcons.Descend;
    var background;
    if (checked) background = 'brand';else background = 'light-2';
    return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      background: background,
      pad: "xsmall"
    }, /*#__PURE__*/_react["default"].createElement(Icon, null));
  })));
};

exports.Children = Children;
var _default = {
  title: 'Input/CheckBoxGroup/Children'
};
exports["default"] = _default;