import React from 'react';
import { Box, Tag } from 'grommet';
export var Simple = function Simple() {
  return /*#__PURE__*/React.createElement(Box, {
    pad: "large",
    gap: "medium",
    align: "start"
  }, /*#__PURE__*/React.createElement(Tag, {
    name: "name",
    value: "value"
  }), /*#__PURE__*/React.createElement(Tag, {
    value: "value"
  }), /*#__PURE__*/React.createElement(Tag, {
    name: "name that is much longer and may need to wrap",
    value: "value"
  }));
};
export default {
  title: 'Type/Tag/Simple'
};