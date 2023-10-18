"use strict";

exports.__esModule = true;
exports["default"] = exports.ArrayOfFormFields = void 0;
var _react = _interopRequireWildcard(require("react"));
var _grommet = require("grommet");
var _grommetIcons = require("grommet-icons");
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && Object.prototype.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
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
        "aria-label": "phone number",
        name: "phones[" + index + "].number",
        required: true,
        validate: [{
          regexp: /^[0-9]*$/
        }, function (number) {
          if (number && number.length > 10) return 'Only 10 numbers';
          return undefined;
        }]
      }), /*#__PURE__*/_react["default"].createElement(_grommet.FormField, {
        label: "Extension",
        "aria-label": "extension",
        name: "phones[" + index + "].ext",
        validate: [{
          regexp: /^[0-9]*$/
        }, function (ext) {
          if (ext && ext.length > 3) return 'Only 3 numbers';
          return undefined;
        }]
      }), /*#__PURE__*/_react["default"].createElement(_grommet.Box, null, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
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
      "aria-label": "name",
      name: "name",
      pad: true,
      required: true,
      validate: [{
        regexp: /^[a-zA-Z ]*$/
      }]
    }), PhoneNumberGroup, /*#__PURE__*/_react["default"].createElement(_grommet.Button, {
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