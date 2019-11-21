import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, RadioButtonGroup } from 'grommet';
import { grommet } from 'grommet/themes';
import { Ascend } from "grommet-icons/es6/icons/Ascend";
import { Descend } from "grommet-icons/es6/icons/Descend";

var ChildrenRadioButtonGroup = function ChildrenRadioButtonGroup() {
  var _useState = useState(),
      value = _useState[0],
      setValue = _useState[1];

  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    align: "center",
    pad: "large"
  }, React.createElement(RadioButtonGroup, {
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
        hover = _ref.hover;
    var Icon = option === 'asc' ? Ascend : Descend;
    var background;
    if (checked) background = 'brand';else if (hover) background = 'light-4';else background = 'light-2';
    return React.createElement(Box, {
      background: background,
      pad: "xsmall"
    }, React.createElement(Icon, null));
  })));
};

storiesOf('RadioButtonGroup', module).add('Children', function () {
  return React.createElement(ChildrenRadioButtonGroup, null);
});