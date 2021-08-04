import React, { useState } from 'react';
import { Box, Grommet, CheckBoxGroup } from 'grommet';
import { grommet } from 'grommet/themes';
import { Ascend } from "grommet-icons/es6/icons/Ascend";
import { Descend } from "grommet-icons/es6/icons/Descend";
var optionsObjects = [{
  label: 'asc',
  disabled: true,
  value: 'asc'
}, {
  label: 'desc',
  value: 'desc'
}];
export var Children = function Children() {
  var _useState = useState(),
      value = _useState[0],
      setValue = _useState[1];

  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(CheckBoxGroup, {
    name: "checkbox",
    direction: "row",
    gap: "xsmall",
    options: optionsObjects,
    value: value,
    onChange: function onChange(_ref) {
      var nextValue = _ref.value;
      return setValue(nextValue);
    }
  }, function (option, _ref2) {
    var checked = _ref2.checked;
    var Icon = option.value === 'asc' ? Ascend : Descend;
    var background;
    if (checked) background = 'brand';else background = 'light-2';
    return /*#__PURE__*/React.createElement(Box, {
      background: background,
      pad: "xsmall"
    }, /*#__PURE__*/React.createElement(Icon, null));
  })));
};
export default {
  title: 'Input/CheckBoxGroup/Children'
};