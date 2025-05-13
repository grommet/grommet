"use strict";

exports.__esModule = true;
exports["default"] = exports.ArrayOfFormFields = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var ArrayOfFormFields = exports.ArrayOfFormFields = function ArrayOfFormFields() {
  var _useState = (0, _react.useState)({
      name: '',
      phones: [{
        number: '',
        ext: ''
      }]
    }),
    values = _useState[0],
    setValues = _useState[1];
  var addPhone = function addPhone() {
    var newPhone = {
      number: '',
      ext: ''
    };
    var newPhones = [].concat(values.phones, [newPhone]);
    setValues(_extends({}, values, {
      phones: newPhones
    }));
  };
  var removePhone = function removePhone(index) {
    if (values.phones && values.phones.length > 0) {
      setValues(_extends({}, values, {
        phones: values.phones.filter(function (v, _idx) {
          return _idx !== index;
        })
      }));
    }
  };
  var handleFormChange = function handleFormChange(newFormState) {
    console.log({
      newFormState: newFormState
    });
    if (newFormState) {
      setValues(newFormState);
    }
  };
  var PhoneNumberGroup = null;
  if (values.phones !== undefined) {
    PhoneNumberGroup = values.phones.map(function (phone, index) {
      return /*#__PURE__*/_react["default"].createElement(_grommet.Box
      // eslint-disable-next-line react/no-array-index-key
      , {
        key: index,
        direction: "row",
        justify: "between",
        align: "center"
      }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
        label: "Phone Number",
        htmlFor: "phone number",
        name: "phones[" + index + "].number",
        required: true,
        validate: [{
          regexp: /^[0-9]*$/
        }, function (number) {
          if (number && number.length > 10) return 'Only 10 numbers';
          return undefined;
        }]
      }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
        "aria-required": true,
        id: "phone number",
        name: "phone number",
        type: "tel"
      })), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
        label: "Extension",
        htmlFor: "extension",
        name: "phones[" + index + "].ext",
        validate: [{
          regexp: /^[0-9]*$/
        }, function (ext) {
          if (ext && ext.length > 3) return 'Only 3 numbers';
          return undefined;
        }]
      }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
        id: "extension",
        name: "extension",
        type: "tel"
      })), /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
        icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Trash, null),
        label: "Remove",
        plain: true,
        hoverIndicator: true,
        onClick: function onClick() {
          return removePhone(index);
        }
      })));
    });
  }
  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    _react["default"].createElement(_grommet.Box, {
      pad: "medium",
      width: "large"
    }, /*#__PURE__*/_react["default"].createElement(_grommet.Form, {
      value: values,
      validate: "blur",
      onReset: function onReset() {
        setValues({
          name: '',
          phones: [{
            number: '',
            ext: ''
          }]
        });
      },
      onChange: handleFormChange,
      onValidate: function onValidate(validationResults) {
        console.log('validationResults = ', validationResults);
      },
      onSubmit: function onSubmit(event) {
        console.log('Submit', event.value, event.touched);
      }
    }, /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
      label: "Name",
      name: "name",
      pad: true,
      required: true,
      htmlFor: "name",
      validate: [{
        regexp: /^[a-zA-Z ]*$/
      }]
    }, /*#__PURE__*/_react["default"].createElement(_grommet.TextInput, {
      "aria-required": true,
      id: "name",
      name: "name"
    })), PhoneNumberGroup, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
      icon: /*#__PURE__*/_react["default"].createElement(_grommetIcons.Add, null),
      label: "Add Number",
      plain: true,
      hoverIndicator: true,
      onClick: addPhone
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
      label: "Submit",
      primary: true
    }))))
    // </Grommet>
  );
};
var _default = exports["default"] = {
  title: 'Input/Form/Array Of Form Fields'
};