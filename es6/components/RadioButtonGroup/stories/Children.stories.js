import React, { useState } from 'react';
import { Box, RadioButtonGroup } from 'grommet';
import { Ascend } from "grommet-icons/es6/icons/Ascend";
import { Descend } from "grommet-icons/es6/icons/Descend";
import styled from 'styled-components';
import { focusStyle, useKeyboard } from 'grommet/utils';
var StyledRadioChild = styled(Box).withConfig({
  displayName: "Childrenstories__StyledRadioChild",
  componentId: "sc-9gh2ar-0"
})(["", ""], function (props) {
  return props.focus && props.keyboard && focusStyle();
});
export var Children = function Children() {
  var _useState = useState(),
    value = _useState[0],
    setValue = _useState[1];
  var usingKeyboard = useKeyboard();
  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large"
  }, /*#__PURE__*/React.createElement(RadioButtonGroup, {
    name: "radio",
    direction: "row",
    gap: "xsmall",
    options: ['asc', 'desc'],
    value: value,
    onChange: function onChange(event) {
      return setValue(event.target.value);
    }
  }, function (option, _ref) {
    var checked = _ref.checked,
      focus = _ref.focus,
      hover = _ref.hover;
    var Icon = option === 'asc' ? Ascend : Descend;
    var background;
    if (checked) background = 'brand';else if (hover) background = 'light-4';else if (focus) background = 'light-4';else background = 'light-2';
    return /*#__PURE__*/React.createElement(StyledRadioChild, {
      focus: focus,
      keyboard: usingKeyboard,
      background: background,
      pad: "xsmall"
    }, /*#__PURE__*/React.createElement(Icon, null));
  }));
};
export default {
  title: 'Input/RadioButtonGroup/Children'
};