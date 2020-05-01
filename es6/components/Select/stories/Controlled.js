function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, Select, Button } from 'grommet';
import { grommet } from 'grommet/themes';

var SimpleSelect = function SimpleSelect(_ref) {
  var theme = _ref.theme,
      rest = _objectWithoutPropertiesLoose(_ref, ["theme"]);

  var options = ['one', 'two'];

  var _useState = useState(''),
      value = _useState[0],
      setValue = _useState[1];

  var _useState2 = useState(false),
      open = _useState2[0],
      setOpen = _useState2[1];

  return /*#__PURE__*/React.createElement(Grommet, {
    full: true,
    theme: theme || grommet
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: function onClick() {
      return setOpen(!open);
    },
    label: "Control the select"
  }), /*#__PURE__*/React.createElement(Select, _extends({
    id: "select",
    name: "select",
    placeholder: "Select",
    open: open,
    value: value,
    options: options,
    onChange: function onChange(_ref2) {
      var option = _ref2.option;
      return setValue(option);
    }
  }, rest))));
};

storiesOf('Select', module).add('Controlled', function () {
  return /*#__PURE__*/React.createElement(SimpleSelect, null);
});