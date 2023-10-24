"use strict";

exports.__esModule = true;
exports["default"] = exports.FieldBorderPosition = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _utils = require("grommet/utils");
var _themes = require("grommet/themes");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
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