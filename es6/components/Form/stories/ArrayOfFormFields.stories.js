function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
import React, { useState } from 'react';
import { Box, Form, Button, FormField, TextInput } from 'grommet';
import { Add } from "grommet-icons/es6/icons/Add";
import { Trash } from "grommet-icons/es6/icons/Trash";
export var ArrayOfFormFields = function ArrayOfFormFields() {
  var _useState = useState({
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
      return /*#__PURE__*/React.createElement(Box
      // eslint-disable-next-line react/no-array-index-key
      , {
        key: index,
        direction: "row",
        justify: "between",
        align: "center"
      }, /*#__PURE__*/React.createElement(FormField, {
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
      }, /*#__PURE__*/React.createElement(TextInput, {
        "aria-required": true,
        id: "phone number",
        name: "phone number",
        type: "tel"
      })), /*#__PURE__*/React.createElement(FormField, {
        label: "Extension",
        htmlFor: "extension",
        name: "phones[" + index + "].ext",
        validate: [{
          regexp: /^[0-9]*$/
        }, function (ext) {
          if (ext && ext.length > 3) return 'Only 3 numbers';
          return undefined;
        }]
      }, /*#__PURE__*/React.createElement(TextInput, {
        id: "extension",
        name: "extension",
        type: "tel"
      })), /*#__PURE__*/React.createElement(Box, null, /*#__PURE__*/React.createElement(Button, {
        icon: /*#__PURE__*/React.createElement(Trash, null),
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
    React.createElement(Box, {
      pad: "medium",
      width: "large"
    }, /*#__PURE__*/React.createElement(Form, {
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
    }, /*#__PURE__*/React.createElement(FormField, {
      label: "Name",
      name: "name",
      pad: true,
      required: true,
      htmlFor: "name",
      validate: [{
        regexp: /^[a-zA-Z ]*$/
      }]
    }, /*#__PURE__*/React.createElement(TextInput, {
      "aria-required": true,
      id: "name",
      name: "name"
    })), PhoneNumberGroup, /*#__PURE__*/React.createElement(Button, {
      icon: /*#__PURE__*/React.createElement(Add, null),
      label: "Add Number",
      plain: true,
      hoverIndicator: true,
      onClick: addPhone
    }), /*#__PURE__*/React.createElement(Box, {
      direction: "row",
      justify: "between",
      margin: {
        top: 'medium'
      }
    }, /*#__PURE__*/React.createElement(Button, {
      label: "Cancel"
    }), /*#__PURE__*/React.createElement(Button, {
      type: "reset",
      label: "Reset"
    }), /*#__PURE__*/React.createElement(Button, {
      type: "submit",
      label: "Submit",
      primary: true
    }))))
    // </Grommet>
  );
};
export default {
  title: 'Input/Form/Array Of Form Fields'
};