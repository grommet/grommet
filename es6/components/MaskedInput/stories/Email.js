import React from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, MaskedInput } from 'grommet';
import { MailOption } from "grommet-icons/es6/icons/MailOption";
import { grommet } from 'grommet/themes';

var EmailMaskedInput = function EmailMaskedInput() {
  var _React$useState = React.useState(''),
      value = _React$useState[0],
      setValue = _React$useState[1];

  var emailMask = [{
    regexp: /^[\w\-_.]+$/,
    placeholder: 'example'
  }, {
    fixed: '@'
  }, {
    regexp: /^[\w]+$/,
    placeholder: 'my'
  }, {
    fixed: '.'
  }, {
    regexp: /^[\w]+$/,
    placeholder: 'com'
  }];
  return /*#__PURE__*/React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Box, {
    width: "medium",
    gap: "medium"
  }, /*#__PURE__*/React.createElement(MaskedInput, {
    icon: /*#__PURE__*/React.createElement(MailOption, null),
    mask: emailMask,
    value: value,
    onChange: function onChange(event) {
      return setValue(event.target.value);
    }
  }), /*#__PURE__*/React.createElement(MaskedInput, {
    reverse: true,
    icon: /*#__PURE__*/React.createElement(MailOption, null),
    mask: emailMask,
    value: value,
    onChange: function onChange(event) {
      return setValue(event.target.value);
    }
  }))));
};

storiesOf('MaskedInput', module).add('Email with Icon', function () {
  return /*#__PURE__*/React.createElement(EmailMaskedInput, null);
});