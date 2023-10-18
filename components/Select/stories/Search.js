"use strict";

exports.__esModule = true;
exports["default"] = exports.Search = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var defaultOptions = [];
for (var i = 1; i <= 200; i += 1) {
  defaultOptions.push("option " + i);
}
var Search = exports.Search = function Search() {
  var _useState = (0, _react.useState)(defaultOptions),
    options = _useState[0],
    setOptions = _useState[1];
  var _useState2 = (0, _react.useState)(''),
    value = _useState2[0],
    setValue = _useState2[1];
  var _useState3 = (0, _react.useState)([]),
    valueMultiple = _useState3[0],
    setValueMultiple = _useState3[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      pad: "large",
      gap: "medium",
      direction: "row"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
      size: "medium",
      placeholder: "Select single option",
      value: value,
      options: options,
      onChange: function onChange(_ref) {
        var option = _ref.option;
        return setValue(option);
      },
      onClose: function onClose() {
        return setOptions(defaultOptions);
      },
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
      }
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
      multiple: true,
      size: "medium",
      placeholder: "Select multiple options",
      value: valueMultiple,
      options: options,
      onChange: function onChange(_ref2) {
        var nextValue = _ref2.value;
        return setValueMultiple(nextValue);
      },
      closeOnChange: false,
      onClose: function onClose() {
        return setOptions(defaultOptions);
      },
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
      }
    }))
    // </Grommet>
  );
};

Search.parameters = {
  chromatic: {
    disable: true
  }
};
Search.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Input/Select/Search'
};