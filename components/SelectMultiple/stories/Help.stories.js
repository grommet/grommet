"use strict";

exports.__esModule = true;
exports["default"] = exports.Help = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _SelectMultiple = require("../SelectMultiple");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var options = ['Apple', 'Orange', 'Banana', 'Grape', 'Melon', 'Strawberry', 'Kiwi', 'Mango', 'Raspberry', 'Rhubarb'];
var Help = exports.Help = function Help() {
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
    }, /*#__PURE__*/_react["default"].createElement(_SelectMultiple.SelectMultiple, {
      value: valueMultiple,
      placeholder: "Select",
      options: options,
      help: "something helpful",
      onChange: function onChange(_ref) {
        var value = _ref.value;
        return setValueMultiple(value);
      }
    }))
    // </Grommet>
  );
};
Help.parameters = {
  chromatic: {
    disable: true
  }
};
Help.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Input/SelectMultiple/Help'
};