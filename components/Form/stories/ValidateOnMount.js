"use strict";

exports.__esModule = true;
exports["default"] = exports.ValidateOnMount = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var ValidateOnMount = exports.ValidateOnMount = function ValidateOnMount() {
  var defaultValue = {
    firstName: 'J',
    lastName: ''
  };
  var _useState = (0, _react.useState)(false),
    valid = _useState[0],
    setValid = _useState[1];
  var _useState2 = (0, _react.useState)(defaultValue),
    value = _useState2[0],
    setValue = _useState2[1];
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
      value: value,
      validate: "change",
      onReset: function onReset(event) {
        return console.log(event);
      },
      onChange: function onChange(nextValue, _ref) {
        var touched = _ref.touched;
        console.log('Change', nextValue, touched);
        setValue(nextValue);
      },
      onValidate: function onValidate(validationResults) {
        console.log('validationResults = ', validationResults);
        setValid(validationResults.valid);
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "First Name",
      htmlFor: "firstName",
      id: "firstName",
      name: "firstName",
      required: true,
      validate: [{
        regexp: /^[a-z]/i
      }, function (firstName) {
        if (firstName && firstName.length === 1) return 'must be >1 character';
        return undefined;
      }]
    }), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Last Name",
      htmlFor: "lastName",
      id: "lastName",
      name: "lastName",
      required: true,
      validate: [{
        regexp: /^[a-z]/i
      }, function (lastName) {
        if (lastName && lastName.length === 1) return 'must be >1 character';
        return undefined;
      }]
    }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, {
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

ValidateOnMount.storyName = 'Validate on mount';
ValidateOnMount.args = {
  full: true
};
var _default = exports["default"] = {
  title: 'Input/Form/Validate on mount'
};