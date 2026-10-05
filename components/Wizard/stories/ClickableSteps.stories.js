"use strict";

exports.__esModule = true;
exports["default"] = exports.ClickableSteps = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _Wizard = require("../Wizard");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var ClickableSteps = exports.ClickableSteps = function ClickableSteps() {
  var _useState = (0, _react.useState)(false),
    complete = _useState[0],
    setComplete = _useState[1];
  var _useState2 = (0, _react.useState)({
      advanced: false
    }),
    value = _useState2[0],
    setValue = _useState2[1];
  var steps = [{
    id: 'details',
    title: 'Details',
    description: 'Provide the resource details.',
    render: function render(/* step, api */
    ) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        gap: "small"
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Describe the resource to create."), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
        htmlFor: "resource-name",
        label: "Resource name",
        name: "name",
        required: true
      }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
        id: "resource-name",
        name: "name"
      })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
        name: "advanced"
      }, /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
        name: "advanced",
        label: "Enable advanced options"
      })));
    }
  }, {
    id: 'configure',
    title: 'Configure',
    description: 'Choose configuration options.',
    status: 'error',
    errorMessage: 'Configuration requires attention.',
    render: function render() {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Configure the resource options.");
    }
  }, {
    id: 'advanced',
    title: 'Advanced',
    description: 'Configure advanced resource options.',
    disabled: !value.advanced,
    disabledReason: 'Enable advanced options to configure this step.',
    render: function render() {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Configure advanced resource options.");
    }
  }, {
    id: 'review',
    title: 'Review',
    description: 'Review before creating the resource.',
    render: function render(step, api) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Paragraph, null, "Review the configuration for ", api.formValue.name || 'your resource', ".");
    }
  }];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    fill: true
  }, /*#__PURE__*/_react["default"].createElement(_Wizard.Wizard, {
    "aria-label": "Create resource",
    clickableSteps: true,
    title: "Create resource",
    showProgress: "vertical",
    steps: steps,
    value: value,
    onChange: function onChange(_ref) {
      var nextValue = _ref.value;
      return setValue(nextValue);
    },
    onComplete: function onComplete() {
      return setComplete(true);
    }
  }), complete && /*#__PURE__*/_react["default"].createElement(_grommet.Notification, {
    toast: {
      position: 'top'
    },
    status: "normal",
    title: "Wizard complete",
    onClose: function onClose() {
      return setComplete(false);
    }
  }));
};
ClickableSteps.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Layout/Wizard/Clickable Steps'
};