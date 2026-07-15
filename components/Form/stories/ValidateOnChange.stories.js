"use strict";

exports.__esModule = true;
exports["default"] = exports.ValidateOnChange = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
var ValidateOnChange = exports.ValidateOnChange = function ValidateOnChange() {
  var _useState = (0, _react.useState)(false),
    valid = _useState[0],
    setValid = _useState[1];
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
      validate: "change",
      onReset: function onReset(event) {
        return console.log(event);
      },
      onSubmit: function onSubmit(_ref) {
        var value = _ref.value;
        return console.log('Submit', value);
      },
      onValidate: function onValidate(validationResults) {
        console.log('validationResults = ', validationResults);
        setValid(validationResults.valid);
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "First Name",
      htmlFor: "firstName",
      name: "firstName",
      required: true,
      validate: [{
        regexp: /^[a-z]/i
      }, function (firstName) {
        if (firstName && firstName.length === 1) return 'must be >1 character';
        return undefined;
      }]
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      "aria-required": true,
      id: "firstName",
      name: "firstName"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Last Name",
      htmlFor: "lastName",
      name: "lastName",
      required: true,
      validate: [{
        regexp: /^[a-z]/i
      }, function (lastName) {
        if (lastName && lastName.length === 1) return 'must be >1 character';
        return undefined;
      }]
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      "aria-required": true,
      id: "lastName",
      name: "lastName"
    })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Size",
      name: "select-size",
      htmlFor: "select-size",
      required: true,
      validate: function validate(val) {
        if (val === 'small') {
          return {
            message: 'Only 10 left in stock!',
            status: 'info'
          };
        }
        return undefined;
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Select, {
      name: "select-size",
      htmlFor: "select-size",
      "aria-required": true,
      id: "select-size",
      options: ['small', 'medium', 'large']
    })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
      direction: "row",
      justify: "between",
      margin: {
        top: 'medium'
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      label: "Cancel"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      type: "reset",
      label: "Reset"
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      type: "submit",
      label: "Update",
      disabled: !valid,
      primary: true
    })))))
    // </Grommet>
  );
};
ValidateOnChange.storyName = 'Validate on change';
ValidateOnChange.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Input/Form/Validate on change'
};