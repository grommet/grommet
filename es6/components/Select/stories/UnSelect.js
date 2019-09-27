import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { Box, Grommet, Select, Button } from 'grommet';
import { grommet } from 'grommet/themes';
var optionList = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten'];

var UnSelect = function UnSelect() {
  var _useState = useState(''),
      value = _useState[0],
      setValue = _useState[1];

  var _onChange = function onChange(e) {
    setValue(e.value);
  };

  var onClickClearOptions = function onClickClearOptions() {
    setValue('');
  };

  return React.createElement(Grommet, {
    theme: grommet
  }, React.createElement(Box, {
    pad: "medium",
    direction: "row",
    align: "center",
    justify: "center",
    gap: "small"
  }, React.createElement(Select, {
    options: optionList,
    onChange: function onChange(e) {
      return _onChange(e);
    },
    value: value,
    placeholder: "Select multiple options",
    multiple: true
  }), React.createElement(Button, {
    onClick: onClickClearOptions,
    disabled: !value,
    plain: true,
    label: "Clear All"
  })));
};

storiesOf('Select', module).add('UnSelect', function () {
  return React.createElement(UnSelect, null);
});