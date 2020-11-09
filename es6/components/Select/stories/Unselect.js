import React, { useState } from 'react';
import { Box, Button, Grommet, Select } from 'grommet';
import { grommet } from 'grommet/themes';
var optionList = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];
export var Unselect = function Unselect() {
  var _useState = useState(''),
      value = _useState[0],
      setValue = _useState[1];

  var _onChange = function onChange(e) {
    setValue(e.value);
  };

  var onClickClearOptions = function onClickClearOptions() {
    setValue('');
  };

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "medium",
    direction: "row",
    align: "center",
    justify: "center",
    gap: "small"
  }, /*#__PURE__*/React.createElement(Select, {
    options: optionList,
    onChange: function onChange(e) {
      return _onChange(e);
    },
    value: value,
    placeholder: "Select multiple options",
    multiple: true
  }), /*#__PURE__*/React.createElement(Button, {
    onClick: onClickClearOptions,
    disabled: !value,
    plain: true,
    label: "Clear All"
  })));
};