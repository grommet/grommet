"use strict";

exports.__esModule = true;
exports["default"] = exports.FieldBorderPosition = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _utils = require("grommet/utils");
var _themes = require("grommet/themes");
var cache;
function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var r, c, a = Object.defineProperty, n = { __proto__: null, "default": e }; if (Object(e) !== e) return n; if (cache || "function" != typeof WeakMap || (cache = new WeakMap()), cache) { if (cache.has(e)) return cache.get(e); cache.set(e, n); } for (c in e) "default" !== c && {}.hasOwnProperty.call(e, c) && ((r = a && Object.getOwnPropertyDescriptor(e, c)) && (r.get || r.set) ? a(n, c, r) : n[c] = e[c]); return n; }
// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0

var allOptions = Array(3).fill().map(function (_, i) {
  return "option " + (i + 1);
});
var borderPositions = [{
  name: 'Default Grommet Theme',
  theme: _themes.grommet
}, {
  name: 'Border Inner',
  theme: (0, _utils.deepMerge)(_themes.grommet, {
    formField: {
      border: {
        position: 'inner',
        side: 'all'
      }
    }
  })
}, {
  name: 'Border Outer',
  theme: (0, _utils.deepMerge)(_themes.grommet, {
    formField: {
      border: {
        position: 'outer',
        side: 'all'
      }
    }
  })
}, {
  name: 'Border None',
  theme: (0, _utils.deepMerge)(_themes.grommet, {
    formField: {
      border: {
        position: 'none'
      }
    }
  })
}, {
  name: 'Border Undefined',
  theme: (0, _utils.deepMerge)(_themes.grommet, {
    formField: {
      border: undefined,
      content: {
        pad: 'large'
      }
    }
  })
}];
var FormExample = function FormExample(_ref) {
  var index = _ref.index,
    borderPosition = _ref.borderPosition,
    theme = _ref.theme;
  var _useState = (0, _react.useState)(''),
    value = _useState[0],
    setValue = _useState[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    background: "#F7F7F7",
    gap: "medium",
    pad: "medium"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
    weight: "bold"
  }, borderPosition), /*#__PURE__*/_react["default"].createElement(_grommet.ThemeContext.Extend, {
    value: theme
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, null, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    htmlFor: "textinput-" + index,
    name: "textinput",
    label: "Label"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
    id: "textinput-" + index,
    name: "textinput",
    placeholder: "placeholder text"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    htmlFor: "select-" + index,
    name: "select",
    label: "Label"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
    id: "select-" + index,
    name: "select",
    placeholder: "-- select --",
    options: allOptions,
    value: value,
    onChange: function onChange(_ref2) {
      var option = _ref2.option;
      return setValue(option);
    }
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    htmlFor: "rbg-" + index,
    name: "rbg",
    label: "Label"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.RadioButtonGroup, {
    id: "rbg-" + index,
    name: "rbg",
    options: allOptions
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    htmlFor: "cbg-" + index,
    name: "cbg",
    label: "Label"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.CheckBoxGroup, {
    id: "cbg-" + index,
    name: "cbg",
    options: allOptions
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    htmlFor: "rangeInput-" + index,
    name: "rangeInput",
    label: "Label"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.RangeInput, {
    id: "rangeInput-" + index,
    name: "rangeInput"
  })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
    htmlFor: "textArea-" + index,
    name: "textArea",
    label: "Label"
  }, /*#__PURE__*/_react["default"].createElement(_grommet.TextArea, {
    id: "textArea-" + index,
    name: "textArea"
  })))));
};
var FieldBorderPosition = exports.FieldBorderPosition = function FieldBorderPosition() {
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Grid, {
      columns: {
        count: 'fit',
        size: ['auto', 'medium']
      },
      gap: "medium"
    }, borderPositions && borderPositions.map(function (example, index) {
      return /*#__PURE__*/_react["default"].createElement(FormExample, {
        key: example.name,
        borderPosition: example.name,
        theme: example.theme,
        index: index
      });
    })))
    // </Grommet>
  );
};
FieldBorderPosition.storyName = 'Field border position';
var _default = exports["default"] = {
  title: 'Input/Form/Custom Themed/Field border position'
};