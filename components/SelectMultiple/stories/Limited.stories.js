"use strict";

exports.__esModule = true;
exports["default"] = exports.SelectMultipleLimited = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var defaultOptions = ['Apple', 'Orange', 'Banana', 'Grape', 'Melon', 'Strawberry', 'Kiwi', 'Mango', 'Raspberry', 'Rhubarb'];
var SelectMultipleLimited = exports.SelectMultipleLimited = function SelectMultipleLimited() {
  var _useState = (0, _react.useState)([]),
    valueMultiple = _useState[0],
    setValueMultiple = _useState[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      pad: "large",
      gap: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "SelectMultiple Limited"), /*#__PURE__*/_react["default"].createElement(_grommet.SelectMultiple, {
      limit: 5,
      help: /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        direction: "row",
        justify: "between",
        flex: false,
        pad: {
          horizontal: 'xsmall',
          bottom: 'xsmall'
        }
      }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, {
        size: "small"
      }, "Select up to 5")),
      value: valueMultiple,
      placeholder: "Select",
      options: defaultOptions,
      onChange: function onChange(_ref) {
        var value = _ref.value;
        setValueMultiple(value);
      }
    }))
    // </Grommet>
  );
};
SelectMultipleLimited.parameters = {
  chromatic: {
    disable: true
  }
};
SelectMultipleLimited.args = {
  full: true
};
SelectMultipleLimited.storyName = 'Limited';
var _default = exports["default"] = {
  title: 'Input/SelectMultiple/Limited'
};