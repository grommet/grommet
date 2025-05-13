"use strict";

exports.__esModule = true;
exports["default"] = exports.DynamicFields = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var DynamicFields = exports.DynamicFields = function DynamicFields() {
  var _useState = (0, _react.useState)(),
    haveAlias = _useState[0],
    setHaveAlias = _useState[1];
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      fill: true,
      align: "center",
      justify: "center"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      width: "medium"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, {
      validate: "blur",
      onReset: function onReset(event) {
        return console.log(event);
      },
      onValidate: function onValidate(event) {
        return console.log('Validate', event);
      },
      onSubmit: function onSubmit(_ref) {
        var value = _ref.value;
        return console.log('Submit', value);
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      htmlFor: "name",
      label: "Name",
      name: "name",
      required: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      "aria-required": true,
      id: "name",
      name: "name"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      htmlFor: "havingAlias",
      name: "haveAlias"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.CheckBox, {
      name: "haveAlias",
      id: "havingAlias",
      label: "alias?",
      checked: haveAlias,
      onChange: function onChange() {
        return setHaveAlias(!haveAlias);
      }
    })), haveAlias && /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      htmlFor: "alias",
      label: "Alias",
      name: "alias",
      required: true
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      id: "alias",
      "aria-required": true,
      name: "alias"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      direction: "row",
      justify: "between",
      margin: {
        top: 'medium'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      type: "reset",
      label: "Reset"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      type: "submit",
      label: "Update",
      primary: true
    })))))
    // </Grommet>
  );
};
DynamicFields.storyName = 'Dynamic fields';
DynamicFields.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Input/Form/Dynamic fields'
};