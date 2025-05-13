"use strict";

exports.__esModule = true;
exports["default"] = exports.FieldStates = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var FieldStates = exports.FieldStates = function FieldStates() {
  var inputRef = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    inputRef.current.focus();
  }, []);
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
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
    })))))
    // </Grommet>
  );
};
FieldStates.storyName = 'Field states';
var _default = exports["default"] = {
  title: 'Input/Form/Field states'
};