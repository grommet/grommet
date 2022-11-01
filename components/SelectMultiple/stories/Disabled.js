"use strict";

exports.__esModule = true;
exports["default"] = exports.Disabled = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _SelectMultiple = require("../SelectMultiple");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var defaultOptions = ['French Vanilla Cake with Buttercream', 'Sweet Grilled Peaches', 'Chocolate Chip Cookies', 'Pineapple Upside-Down Cake', 'Peanut Butter Chocolate Fondue', 'Strawberry Shortcake', 'Peach Cobbler', 'German Chocolate Cake', 'Carrot Cake with Cream Cheese Frosting', 'Cinnamon Coffee Cake'];
var Disabled = function Disabled() {
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
exports.Disabled = Disabled;
Disabled.parameters = {
  chromatic: {
    disable: true
  }
};
Disabled.args = {
  full: true
};
var _default = {
  title: 'Input/SelectMultiple/Disabled'
};
exports["default"] = _default;