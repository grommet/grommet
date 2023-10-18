"use strict";

exports.__esModule = true;
exports["default"] = exports.InsideFormField = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _SelectMultiple = require("../SelectMultiple");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var options = ['Apple', 'Orange', 'Banana', 'Grape', 'Melon', 'Strawberry', 'Kiwi', 'Mango', 'Raspberry', 'Rhubarb'];
var InsideFormField = exports.InsideFormField = function InsideFormField() {
  var _useState = (0, _react.useState)({}),
    value = _useState[0],
    setValue = _useState[1];
  var onChange = (0, _react.useCallback)(function (nextValue) {
    return setValue(nextValue);
  }, []);
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      align: "center",
      pad: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, {
      value: value,
      onChange: onChange,
      onSubmit: function onSubmit() {
        return console.log('Submit', value);
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Label",
      name: "select"
    }, /*#__PURE__*/_react["default"].createElement(_SelectMultiple.SelectMultiple, {
      showSelectedInline: true,
      name: "select",
      placeholder: "placeholder",
      options: options
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      type: "submit",
      label: "Update",
      primary: true
    })))
    // </Grommet>
  );
};

InsideFormField.parameters = {
  chromatic: {
    disable: true
  }
};
InsideFormField.storyName = 'Inside a FormField';
var _default = exports["default"] = {
  title: 'Input/SelectMultiple/Inside a FormField'
};