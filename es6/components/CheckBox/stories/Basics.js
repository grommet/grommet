function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, CheckBox } from 'grommet';
import { grommet } from 'grommet/themes';

var SimpleCheckBox = function SimpleCheckBox(_ref) {
  var checkedProp = _ref.checked,
      rest = _objectWithoutPropertiesLoose(_ref, ["checked"]);

  var _useState = useState(!!checkedProp),
      checked = _useState[0],
      setChecked = _useState[1];

  var onChange = function onChange(event) {
    return setChecked(event.target.checked);
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(CheckBox, _extends({}, rest, {
    checked: checked,
    onChange: onChange
  }))));
};

storiesOf('CheckBox', module).add('Simple', function () {
  return /*#__PURE__*/React.createElement(SimpleCheckBox, {
    label: "Choice"
  });
}).add('Toggle', function () {
  return /*#__PURE__*/React.createElement(SimpleCheckBox, {
    label: "Choice",
    toggle: true
  });
}).add('Disabled', function () {
  return /*#__PURE__*/React.createElement(SimpleCheckBox, {
    label: "Choice",
    checked: true,
    disabled: true
  });
}).add('Reverse', function () {
  return /*#__PURE__*/React.createElement(SimpleCheckBox, {
    label: "Choice",
    reverse: true
  });
}).add('No Label', function () {
  return /*#__PURE__*/React.createElement(SimpleCheckBox, null);
});