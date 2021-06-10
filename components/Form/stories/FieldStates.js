"use strict";

exports.__esModule = true;
exports["default"] = exports.FieldStates = void 0;

var _react = _interopRequireWildcard(require("react"));

var _grommet = require("grommet");

var _themes = require("grommet/themes");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var FieldStates = function FieldStates() {
  var inputRef = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    inputRef.current.focus();
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: _themes.grommet
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, null, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    border: true,
    gap: "medium",
    pad: "large",
    width: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    htmlFor: "enabled-id",
    name: "enabled",
    label: "Default"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    id: "enabled-id",
    name: "enabled",
    placeholder: "Enter a username"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    htmlFor: "focus-id",
    name: "focus",
    label: "Focus State"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    id: "focus-id",
    name: "focus",
    placeholder: "Enter a username",
    ref: inputRef
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    htmlFor: "info-id",
    name: "info-demo",
    label: "Info State",
    info: "Unique name. No spaces. May include '-' as a separator."
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    id: "info-id",
    name: "info-demo",
    placeholder: "Enter a username",
    value: "fluffyKi"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    htmlFor: "error-id",
    name: "error-demo",
    label: "Error State",
    error: "It looks like that username is already taken. Bummer."
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    id: "error-id",
    name: "error-demo",
    placeholder: "Enter a username",
    value: "fluffyKitty123"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    htmlFor: "disabled-id",
    name: "disabled",
    label: "Disabled State",
    disabled: true
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    id: "disabled-id",
    name: "disabled",
    placeholder: "Enter a username",
    disabled: true
  }))))));
};

exports.FieldStates = FieldStates;
FieldStates.storyName = 'Field states';
var _default = {
  title: 'Input/Form/Field states'
};
exports["default"] = _default;