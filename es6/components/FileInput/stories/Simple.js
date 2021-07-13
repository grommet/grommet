import React from 'react';
import { Box, Grommet, FileInput } from 'grommet';
import { grommet } from 'grommet/themes';
export var Simple = function Simple() {
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
  title: 'Input/FileInput/Simple'
};