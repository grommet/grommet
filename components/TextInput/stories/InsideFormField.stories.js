"use strict";

exports.__esModule = true;
exports["default"] = exports.InsideFormField = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var allSuggestions = Array(100).fill().map(function (_, i) {
  return "suggestion " + (i + 1);
});
var InsideFormField = exports.InsideFormField = function InsideFormField(props) {
  var _useState = (0, _react.useState)({
      value: '',
      suggestions: allSuggestions
    }),
    state = _useState[0],
    setState = _useState[1];
  var onChange = function onChange(event) {
    var value = event.target.value;
    // The line below escapes regular expression special characters:
    // [ \ ^ $ . | ? * + ( )
    var escapedText = value.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');

    // Create the regular expression with modified value which
    // handles escaping special characters. Without escaping special
    // characters, errors will appear in the console
    var exp = new RegExp(escapedText, 'i');
    var suggestions = allSuggestions.filter(function (s) {
      return exp.test(s);
    });
    setState({
      value: value,
      suggestions: suggestions
    });
  };
  var onSelect = function onSelect(event) {
    return setState(_extends({}, state, {
      value: event.suggestion
    }));
  };
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, {
      onSubmit: function onSubmit(_ref) {
        var nextValue = _ref.value;
        console.log(nextValue);
        setState({
          value: '',
          suggestions: allSuggestions
        });
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, _extends({
      label: "Label",
      htmlFor: "text-input"
    }, props), /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      id: "text-input",
      placeholder: "placeholder",
      value: state.value,
      onChange: onChange,
      onSelect: onSelect,
      suggestions: state.suggestions
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      type: "submit",
      label: "submit"
    })))
    // </Grommet>
  );
};
InsideFormField.storyName = 'Inside a FormField';
var _default = exports["default"] = {
  title: 'Input/TextInput/Inside a FormField'
};