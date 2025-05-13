"use strict";

exports.__esModule = true;
exports["default"] = exports.InitialValues = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var InitialValues = exports.InitialValues = function InitialValues() {
  var _useState = (0, _react.useState)(['First', 'Second']),
    value = _useState[0],
    setValue = _useState[1];
  var _useState2 = (0, _react.useState)(['M']),
    value2 = _useState2[0],
    setValue2 = _useState2[1];
  return /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
    pad: "medium",
    gap: "large"
  }, "Initial value via options object:", /*#__PURE__*/_react["default"].createElement(_grommet.CheckBoxGroup, {
    value: value,
    onChange: function onChange(event) {
      console.log('value: ', event.value);
      console.log('option: ', event.option);
      setValue(event.value);
    },
    options: ['First', 'Second', 'Third']
  }), "Initial value via controlled options object:", /*#__PURE__*/_react["default"].createElement(_grommet.CheckBoxGroup, {
    labelKey: "label",
    valueKey: "id",
    value: value2,
    onChange: function onChange(_ref) {
      var nextValue = _ref.value,
        option = _ref.option;
      console.log('nextValue: ', nextValue);
      console.log('option: ', option);
      setValue2(nextValue);
    },
    options: [{
      label: 'Maui',
      id: 'M'
    }, {
      label: 'Jerusalem',
      id: 'J'
    }, {
      label: 'Wuhan',
      id: 'W'
    }]
  }));
};
InitialValues.storyName = 'Initial values';
var _default = exports["default"] = {
  title: 'Input/CheckBoxGroup/Initial values'
};