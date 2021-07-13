import React from 'react';
import { Box, Grommet, FileInput, Text } from 'grommet';
import { Trash } from "grommet-icons/es6/icons/Trash";
var customTheme = {
  fileInput: {
    button: {
      hover: {
        color: 'accent-2'
      },
      border: {
        color: 'skyblue',
        width: '1px'
      },
      pad: {
        vertical: '4px',
        horizontal: '8px'
      }
    },
    background: '#f2f2f2',
    border: {
      size: 'medium'
    },
    pad: {
      horizontal: 'large',
      vertical: 'medium'
    },
    round: 'small',
    label: {
      size: 'large'
    },
    icons: {
      remove: Trash
    },
    dragOver: {
      border: {
        color: 'focus'
      }
    },
    hover: {
      border: {
        color: 'control'
      },
      extend: "letterSpacing: '0.1em'"
    }
  }
};
export var Custom = function Custom() {
  return /*#__PURE__*/React.createElement(Grommet, {
    full: true,
    theme: customTheme
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Box, {
    width: "medium"
  }, /*#__PURE__*/React.createElement(FileInput, {
    renderFile: function renderFile(file) {
      return /*#__PURE__*/React.createElement(Box, {
        direction: "row",
        gap: "small"
      }, /*#__PURE__*/React.createElement(Text, {
        weight: "bold"
      }, file.name), /*#__PURE__*/React.createElement(Text, {
        color: "text-weak"
      }, file.size, " bytes"));
    },
    onChange: function onChange(event, _ref) {
      var files = _ref.files;
      var fileList = files;

      for (var i = 0; i < fileList.length; i += 1) {
        var file = fileList[i];
        console.log(file.name);
      }
    }
  }))));
};
export default {
  title: 'Input/FileInput/Custom'
};