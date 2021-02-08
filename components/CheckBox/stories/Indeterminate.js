"use strict";

exports.__esModule = true;
exports["default"] = exports.Indeterminate = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Indeterminate = function Indeterminate() {
  var _useState = (0, _react.useState)([]),
      checked = _useState[0],
      setChecked = _useState[1];

  var checkboxes = ['fruits', 'vegetables', 'olive oil'];

  var onCheckAll = function onCheckAll(event) {
    if (event.target.checked) {
      setChecked(checkboxes);
    } else {
      setChecked([]);
    }
  };

  var onCheck = function onCheck(event, value) {
    if (event.target.checked) {
      setChecked([].concat(checked, [value]));
    } else {
      setChecked(checked.filter(function (item) {
        return item !== value;
      }));
    }
  };

  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    direction: "row",
    gap: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
    checked: checked.length === 3,
    indeterminate: checked.length > 0 && checked.length < 3,
    label: "All",
    onChange: onCheckAll
  }), checkboxes.map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
      key: item,
      checked: checked.includes(item),
      label: item,
      onChange: function onChange(e) {
        return onCheck(e, item);
      }
    });
  }))));
};

exports.Indeterminate = Indeterminate;
var _default = {
  title: 'Input/CheckBox/Indeterminate'
};
exports["default"] = _default;