import React from 'react';
import { Box, FileInput } from 'grommet';
export var Simple = function Simple() {
  return /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Box, {
    width: "medium"
  }, /*#__PURE__*/React.createElement(FileInput, {
    "aria-label": "Choose files",
    onChange: function onChange(event, _ref) {
      var files = _ref.files;
      var fileList = files;
      for (var i = 0; i < fileList.length; i += 1) {
        var file = fileList[i];
        console.log(file.name);
      }
    }
  })));
};
export default {
  title: 'Input/FileInput/Simple'
};