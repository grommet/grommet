import React from 'react';
import { Box, Button, RadioButton } from 'grommet';
import { Ascend } from "grommet-icons/es6/icons/Ascend";
import styled from 'styled-components';
import { focusStyle, useKeyboard } from 'grommet/utils';
var StyledRadioChild = styled(Box).withConfig({
  displayName: "Childrenstories__StyledRadioChild",
  componentId: "sc-z14q6m-0"
})(["", ""], function (props) {
  return props.focus && props.keyboard && focusStyle();
});
export var Children = function Children() {
  var _React$useState = React.useState(),
    selected = _React$useState[0],
    setSelected = _React$useState[1];
  var usingKeyboard = useKeyboard();
  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    pad: "large",
    gap: "large"
  }, /*#__PURE__*/React.createElement(RadioButton, {
    name: "name",
    value: "option 1",
    checked: selected === 'option 1',
    onChange: function onChange(event) {
      return setSelected(event.target.value);
    }
  }, function (_ref) {
    var checked = _ref.checked,
      focus = _ref.focus;
    return /*#__PURE__*/React.createElement(StyledRadioChild, {
      focus: focus,
      keyboard: usingKeyboard
    }, /*#__PURE__*/React.createElement(Ascend, {
      color: checked ? 'brand' : 'status-unknown'
    }));
  }), /*#__PURE__*/React.createElement(Button, {
    label: "clear",
    onClick: function onClick() {
      return setSelected(undefined);
    }
  }));
};
export default {
  title: 'Input/RadioButton/Children'
};