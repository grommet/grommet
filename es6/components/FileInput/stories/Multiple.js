import React from 'react';
import { Box, Grommet, FileInput } from 'grommet';
import { grommet } from 'grommet/themes';
export var Multiple = function Multiple() {
  return /*#__PURE__*/React.createElement(Grommet, {
    full: true,
    theme: grommet
  }, /*#__PURE__*/React.createElement(Box, {
    fill: true,
    align: "center",
    justify: "start",
    pad: "large"
  }, /*#__PURE__*/React.createElement(Box, {
    width: "medium"
  }, /*#__PURE__*/React.createElement(FileInput, {
    multiple: true,
    onChange: function onChange(event) {
      var fileList = event.target.files;

      for (var i = 0; i < fileList.length; i += 1) {
        var file = fileList[i];
        console.log(file.name);
      }
    }
  }))));
};
export default {
  title: 'Input/FileInput/Multiple'
};