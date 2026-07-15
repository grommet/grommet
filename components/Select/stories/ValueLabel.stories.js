"use strict";

exports.__esModule = true;
exports["default"] = exports.ValueLabel = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommetIcons = require("grommet-icons");
var _grommet = require("grommet");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var ValueLabel = exports.ValueLabel = function ValueLabel() {
  var options = ['one', 'two'];
  var _useState = (0, _react.useState)(''),
    value = _useState[0],
    setValue = _useState[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "start",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
      id: "select",
      name: "select",
      placeholder: "Select",
      value: value,
      options: options,
      onChange: function onChange(_ref) {
        var option = _ref.option;
        return setValue(option);
      },
      plain: true,
      valueLabel: /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
        width: "small",
        overflow: "hidden",
        align: "center",
        border: {
          color: 'dark-3',
          size: 'xsmall',
          style: 'solid',
          side: 'bottom'
        }
      }, value || 'Select...'),
      icon: /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommetIcons.CaretDown, {
        size: "small",
        color: "black"
      }))
    }))
    // </Grommet>
  );
};
ValueLabel.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Input/Select/Value Label'
};