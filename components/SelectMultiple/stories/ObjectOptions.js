"use strict";

exports.__esModule = true;
exports["default"] = exports.ObjectOptions = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _SelectMultiple = require("../SelectMultiple");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
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
var ObjectOptions = function ObjectOptions() {
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
exports.ObjectOptions = ObjectOptions;
ObjectOptions.storyName = 'Object options';
ObjectOptions.parameters = {
  chromatic: {
    disable: true
  }
};
var _default = {
  title: 'Input/SelectMultiple/Object options'
};
exports["default"] = _default;