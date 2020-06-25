import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { grommet, Box, CheckBoxGroup, Form, FormField, Select, Grid, Grommet, RadioButtonGroup, RangeInput, Text, TextArea, TextInput, ThemeContext } from 'grommet';
import { deepMerge } from 'grommet/utils';
var allOptions = Array(3).fill().map(function (_, i) {
  return "option " + (i + 1);
});
var borderPositions = [{
  name: 'Default Grommet Theme',
  theme: grommet
}, {
  name: 'Border Inner',
  theme: deepMerge(grommet, {
    formField: {
      border: {
        position: 'inner',
        side: 'all'
      }
    }
  })
}, {
  name: 'Border Outer',
  theme: deepMerge(grommet, {
    formField: {
      border: {
        position: 'outer',
        side: 'all'
      }
    }
  })
}, {
  name: 'Border None',
  theme: deepMerge(grommet, {
    formField: {
      border: {
        position: 'none'
      }
    }
  })
}, {
  name: 'Border Undefined',
  theme: deepMerge(grommet, {
    formField: {
      border: undefined,
      content: {
        pad: 'large'
      }
    }
  })
}];

var FormExample = function FormExample(_ref) {
  var index = _ref.index,
      borderPosition = _ref.borderPosition,
      theme = _ref.theme;

  var _useState = useState(''),
      value = _useState[0],
      setValue = _useState[1];

  return /*#__PURE__*/React.createElement(Box, {
    background: "#F7F7F7",
    gap: "medium",
    pad: "medium"
  }, /*#__PURE__*/React.createElement(Text, {
    weight: "bold"
  }, borderPosition), /*#__PURE__*/React.createElement(ThemeContext.Extend, {
    value: theme
  }, /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement(FormField, {
    htmlFor: "textinput-" + index,
    name: "textinput",
    label: "Label"
  }, /*#__PURE__*/React.createElement(TextInput, {
    id: "textinput-" + index,
    name: "textinput",
    placeholder: "placeholder text"
  })), /*#__PURE__*/React.createElement(FormField, {
    htmlFor: "select-" + index,
    name: "select",
    label: "Label"
  }, /*#__PURE__*/React.createElement(Select, {
    id: "select-" + index,
    name: "select",
    placeholder: "-- select --",
    options: allOptions,
    value: value,
    onChange: function onChange(_ref2) {
      var option = _ref2.option;
      return setValue(option);
    }
  })), /*#__PURE__*/React.createElement(FormField, {
    htmlFor: "rbg-" + index,
    name: "rbg",
    label: "Label"
  }, /*#__PURE__*/React.createElement(RadioButtonGroup, {
    id: "rbg-" + index,
    name: "rbg",
    options: allOptions
  })), /*#__PURE__*/React.createElement(FormField, {
    htmlFor: "cbg-" + index,
    name: "cbg",
    label: "Label"
  }, /*#__PURE__*/React.createElement(CheckBoxGroup, {
    id: "cbg-" + index,
    name: "cbg",
    options: allOptions
  })), /*#__PURE__*/React.createElement(FormField, {
    htmlFor: "rangeInput-" + index,
    name: "rangeInput",
    label: "Label"
  }, /*#__PURE__*/React.createElement(RangeInput, {
    id: "rangeInput-" + index,
    name: "rangeInput"
  })), /*#__PURE__*/React.createElement(FormField, {
    htmlFor: "textArea-" + index,
    name: "textArea",
    label: "Label"
  }, /*#__PURE__*/React.createElement(TextArea, {
    id: "textArea-" + index,
    name: "textArea"
  })))));
};

var FormFieldBorderPosition = function FormFieldBorderPosition() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    pad: "large"
  }, /*#__PURE__*/React.createElement(Grid, {
    columns: {
      count: 'fit',
      size: ['auto', 'medium']
    },
    gap: "medium"
  }, borderPositions && borderPositions.map(function (example, index) {
    return /*#__PURE__*/React.createElement(FormExample, {
      borderPosition: example.name,
      theme: example.theme,
      index: index
    });
  }))));
};

storiesOf('Form', module).add('Field Border Positions', function () {
  return /*#__PURE__*/React.createElement(FormFieldBorderPosition, null);
});