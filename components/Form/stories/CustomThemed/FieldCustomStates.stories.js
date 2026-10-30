"use strict";

exports.__esModule = true;
exports["default"] = exports.FieldCustomStates = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _utils = require("grommet/utils");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var customTheme = (0, _utils.deepMerge)(_grommet.grommet, {
  formField: {
    border: {
      error: {
        color: 'border'
      },
      color: 'border',
      side: 'all'
    },
    disabled: {
      background: {
        color: undefined
      },
      border: {
        color: 'status-disabled'
      },
      label: {
        color: 'status-disabled'
      }
    },
    error: {
      background: {
        color: {
          light: '#FF404033',
          dark: '#FF40404D'
        }
      },
      size: 'xsmall',
      color: 'text-weak',
      margin: {
        start: 'none'
      }
    },
    help: {
      size: 'xsmall',
      color: 'text-weak',
      margin: {
        start: 'none',
        bottom: 'xsmall'
      }
    },
    info: {
      size: 'xsmall',
      color: 'text-weak',
      margin: {
        start: 'none'
      }
    },
    label: {
      size: 'xsmall',
      color: 'text-weak',
      margin: {
        horizontal: 'none'
      }
    },
    round: '4px'
  }
});
var FieldCustomStates = exports.FieldCustomStates = function FieldCustomStates() {
  var inputRef = (0, _react.useRef)();
  (0, _react.useEffect)(function () {
    var focusTimeout = setTimeout(function () {
      var _inputRef$current;
      (_inputRef$current = inputRef.current) == null || _inputRef$current.focus();
    });
    return function () {
      return clearTimeout(focusTimeout);
    };
  }, []);
  return /*#__PURE__*/_react["default"].createElement(_grommet.Grommet, {
    theme: customTheme
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
FieldCustomStates.storyName = 'Field custom states';
var _default = exports["default"] = {
  title: 'Input/Form/Custom Themed/Field custom states'
};