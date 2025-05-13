"use strict";

exports.__esModule = true;
exports["default"] = exports.Disabled = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _SelectMultiple = require("../SelectMultiple");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var defaultOptions = ['French Vanilla Cake with Buttercream', 'Sweet Grilled Peaches', 'Chocolate Chip Cookies', 'Pineapple Upside-Down Cake', 'Peanut Butter Chocolate Fondue', 'Strawberry Shortcake', 'Peach Cobbler', 'German Chocolate Cake', 'Carrot Cake with Cream Cheese Frosting', 'Cinnamon Coffee Cake'];
var Disabled = exports.Disabled = function Disabled() {
  var _useState = (0, _react.useState)(defaultOptions),
    options = _useState[0],
    setOptions = _useState[1];
  var _useState2 = (0, _react.useState)(['Chocolate Chip Cookies', 'Strawberry Shortcake']),
    valueMultiple = _useState2[0],
    setValueMultiple = _useState2[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      pad: "large",
      gap: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Text, null, "SelectMultiple Disabled"), /*#__PURE__*/_react["default"].createElement(_SelectMultiple.SelectMultiple, {
      width: "medium",
      showSelectedInline: true,
      dropProps: {
        width: 'medium'
      }
      // icon={<CaretDown />}
      // icon={false}
      ,
      disabled: ['Chocolate Chip Cookies', 'Pineapple Upside-Down Cake'],
      value: valueMultiple,
      placeholder: "Select",
      options: options,
      onSearch: function onSearch(text) {
        // The line below escapes regular expression special characters:
        // [ \ ^ $ . | ? * + ( )
        var escapedText = text.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

        // Create the regular expression with modified value which
        // handles escaping special characters. Without escaping special
        // characters, errors will appear in the console
        var exp = new RegExp(escapedText, 'i');
        setOptions(defaultOptions.filter(function (o) {
          return exp.test(o);
        }));
      },
      onClose: function onClose() {
        return setOptions(defaultOptions);
      },
      onChange: function onChange(_ref) {
        var value = _ref.value;
        setValueMultiple(value);
      }
    }))
    // </Grommet>
  );
};
Disabled.parameters = {
  chromatic: {
    disable: true
  }
};
Disabled.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Input/SelectMultiple/Disabled'
};