import React from 'react';
import { Box, FileInput } from 'grommet';
export var Multiple = function Multiple() {
  return /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Box, {
    width: "medium"
  }, /*#__PURE__*/React.createElement(FileInput, {
    "aria-label": "Choose files",
    multiple: {
      max: 5
    },
    onChange: function onChange(event, _ref) {
      var files = _ref.files;
      console.log(event);
      console.log(event.target.files);
      for (var i = 0; i < files.length; i += 1) {
        var file = files[i];
        console.log(file.name);
      }
    }
  })));
};
export default {
  title: 'Input/FileInput/Multiple'
};