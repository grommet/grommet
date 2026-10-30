"use strict";

exports.__esModule = true;
exports["default"] = exports.ObjectOptions = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _SelectMultiple = require("../SelectMultiple");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var objectOptions = [{
  label: 'Red',
  value: 1
}, {
  label: 'Blue',
  value: 2
}, {
  label: 'Green',
  value: 3
}, {
  label: 'Purple',
  value: 4
}, {
  label: 'Pink',
  value: 5
}, {
  label: 'Grey',
  value: 6
}];
var ObjectOptions = exports.ObjectOptions = function ObjectOptions() {
  var _useState = (0, _react.useState)(objectOptions),
    options = _useState[0],
    setOptions = _useState[1];
  var _useState2 = (0, _react.useState)([{
      label: 'Red',
      value: 1
    }, {
      label: 'Grey',
      value: 6
    }]),
    value = _useState2[0],
    setValue = _useState2[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      fill: true,
      gap: "large",
      align: "center",
      justify: "start",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "SelectMultiple with Object Options"), /*#__PURE__*/_react["default"].createElement(_SelectMultiple.SelectMultiple, {
      value: value,
      onSearch: function onSearch(text) {
        var escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
        // Create the regular expression with modified value which
        // handles escaping special characters. Without escaping special
        // characters, errors will appear in the console
        var exp = new RegExp(escapedText, 'i');
        setOptions(objectOptions.filter(function (o) {
          return exp.test(o.label);
        }));
      },
      showSelectedInline: true,
      id: "select",
      name: "select",
      placeholder: "Select",
      labelKey: "label",
      valueKey: {
        key: 'value'
      },
      options: options,
      onClose: function onClose() {
        setOptions(objectOptions);
      },
      onChange: function onChange(_ref) {
        var nextValue = _ref.value;
        setValue(nextValue);
      }
    }))
    // </Grommet>
  );
};
ObjectOptions.storyName = 'Object options';
ObjectOptions.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = exports["default"] = {
  title: 'Input/SelectMultiple/Object options'
};