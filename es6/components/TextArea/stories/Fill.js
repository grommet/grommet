import React, { useState } from 'react';
import { Box, TextArea } from 'grommet';
export var Fill = function Fill() {
  var _useState = useState(''),
      value = _useState[0],
      setValue = _useState[1];

  var onChange = function onChange(event) {
    return setValue(event.target.value);
  };

  return (
    /*#__PURE__*/
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    React.createElement(Box, {
      width: "large",
      height: "medium",
      border: {
        color: 'brand',
        size: 'medium'
      }
    }, /*#__PURE__*/React.createElement(TextArea, {
      value: value,
      onChange: onChange,
      fill: true
    })) // </Grommet>

  );
};
Fill.parameters = {
  chromatic: {
    disable: true
  }
};
export default {
  title: 'Input/TextArea/Fill'
};