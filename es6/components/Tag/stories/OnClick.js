import React from 'react';
import { Box, Tag } from 'grommet';
export var OnClick = function OnClick() {
  var onClick = function onClick() {};
  return /*#__PURE__*/React.createElement(Box, {
    pad: "large",
    gap: "medium",
    align: "start"
  }, /*#__PURE__*/React.createElement(Tag, {
    name: "name",
    value: "value",
    onClick: onClick
  }), /*#__PURE__*/React.createElement(Tag, {
    value: "value",
    onClick: onClick
  }));
};
OnClick.storyName = 'OnClick';
export default {
  title: 'Type/Tag/OnClick'
};