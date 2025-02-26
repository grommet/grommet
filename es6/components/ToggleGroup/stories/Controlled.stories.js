import React, { useState } from 'react';
import { Box, ToggleGroup, Text } from 'grommet';
export var Controlled = function Controlled() {
  var _useState = useState(['Option 2']),
    value = _useState[0],
    setValue = _useState[1];
  return /*#__PURE__*/React.createElement(Box, {
    direction: "row",
    gap: "xlarge",
    overflow: "auto"
  }, /*#__PURE__*/React.createElement(Box, {
    gap: "large",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Text, null, "In multiple selection mode, enforce at least one selection."), /*#__PURE__*/React.createElement(ToggleGroup, {
    options: ['Option 1', 'Option 2', 'Option 3'],
    value: value,
    onToggle: function onToggle(e) {
      if (e.value.length) setValue(e.value);
    },
    multiple: true
  })));
};
export default {
  title: 'Controls/ToggleGroup/Controlled'
};