import React, { useState } from 'react';
import { Box, Button, CheckBox, Grommet, Text } from 'grommet';
import { grommet } from 'grommet/themes';
export var InsideButton = function InsideButton() {
  var _useState = useState(false),
      checked = _useState[0],
      setChecked = _useState[1];

  var onButtonClick = function onButtonClick() {
    return setChecked(!checked);
  };

  var onCheckboxChange = function onCheckboxChange() {};

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Button, {
    hoverIndicator: "background",
    onClick: onButtonClick
  }, /*#__PURE__*/React.createElement(CheckBox, {
    tabIndex: "-1",
    checked: checked,
    label: /*#__PURE__*/React.createElement(Text, null, "Hi"),
    onChange: onCheckboxChange
  }))));
};
InsideButton.storyName = 'Inside a Button';
export default {
  title: 'Input/CheckBox/Inside a Button'
};