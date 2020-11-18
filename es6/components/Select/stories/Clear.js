import React, { useState } from 'react';
import { Box, Grommet, Select, grommet, FormField, ThemeContext } from 'grommet';
var options = ['one', 'two', 'three'];

var ClearTop = function ClearTop() {
  var _useState = useState(),
      value = _useState[0],
      setValue = _useState[1];

  return /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Select, {
    placeholder: "Clear on top",
    multiple: true,
    value: value,
    options: options,
    onChange: function onChange(_ref) {
      var nextValue = _ref.value;
      return setValue(nextValue);
    },
    clear: true
  }));
};

var ClearBottom = function ClearBottom() {
  var _useState2 = useState(),
      value = _useState2[0],
      setValue = _useState2[1];

  return /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Select, {
    placeholder: "Clear on bottom",
    multiple: true,
    value: value,
    options: options,
    onChange: function onChange(_ref2) {
      var nextValue = _ref2.value;
      return setValue(nextValue);
    },
    clear: {
      position: 'bottom'
    }
  }));
};

var ClearLabel = function ClearLabel() {
  var _useState3 = useState(),
      value = _useState3[0],
      setValue = _useState3[1];

  return /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Select, {
    placeholder: "Clear with label",
    multiple: true,
    value: value,
    options: options,
    onChange: function onChange(_ref3) {
      var nextValue = _ref3.value;
      return setValue(nextValue);
    },
    clear: {
      label: 'Click me!'
    }
  }));
};

var ClearCustomTheme = function ClearCustomTheme() {
  var _useState4 = useState(),
      value = _useState4[0],
      setValue = _useState4[1];

  return /*#__PURE__*/React.createElement(ThemeContext.Extend, {
    value: {
      select: {
        clear: {
          container: {
            background: 'accent-4'
          },
          text: {
            color: 'neutral-3',
            weight: 900
          }
        }
      }
    }
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Select, {
    placeholder: "Clear with a custom theme",
    multiple: true,
    value: value,
    options: options,
    onChange: function onChange(_ref4) {
      var nextValue = _ref4.value;
      return setValue(nextValue);
    },
    clear: true
  })));
};

var ClearForm = function ClearForm() {
  var _useState5 = useState(),
      value = _useState5[0],
      setValue = _useState5[1];

  return /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(FormField, {
    label: "Numbers",
    name: "numbers"
  }, /*#__PURE__*/React.createElement(Select, {
    name: "numbers",
    placeholder: "Clear within formfield",
    multiple: true,
    options: options,
    value: value,
    clear: true,
    onChange: function onChange(_ref5) {
      var nextValue = _ref5.value;
      return setValue(nextValue);
    }
  })));
};

export var Clear = function Clear() {
  return /*#__PURE__*/React.createElement(Grommet, {
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "column",
    align: "start"
  }, /*#__PURE__*/React.createElement(Box, {
    direction: "row"
  }, /*#__PURE__*/React.createElement(ClearTop, null), /*#__PURE__*/React.createElement(ClearBottom, null), /*#__PURE__*/React.createElement(ClearLabel, null)), /*#__PURE__*/React.createElement(Box, {
    direction: "row"
  }, /*#__PURE__*/React.createElement(ClearForm, null), /*#__PURE__*/React.createElement(ClearCustomTheme, null))));
};
Clear.story = {
  name: 'Clear',
  parameters: {
    chromatic: {
      disable: true
    }
  }
};