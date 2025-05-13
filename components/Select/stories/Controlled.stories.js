"use strict";

exports.__esModule = true;
exports["default"] = exports.Controlled = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var Controlled = exports.Controlled = function Controlled() {
  var options = ['one', 'two'];
  var _useState = (0, _react.useState)(''),
    value = _useState[0],
    setValue = _useState[1];
  var _useState2 = (0, _react.useState)(false),
    open = _useState2[0],
    setOpen = _useState2[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large",
      gap: "small"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      onClick: function onClick() {
        return setOpen(!open);
      },
      label: "Control the select"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
      id: "select",
      name: "select",
      placeholder: "Select",
      open: open,
      value: value,
      options: options,
      onChange: function onChange(_ref) {
        var option = _ref.option;
        return setValue(option);
      }
    }))
    // </Grommet>
  );
};
Controlled.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Input/Select/Controlled'
};