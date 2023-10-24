import React from 'react';
import { Box, Tag } from 'grommet';
export var OnRemove = function OnRemove() {
  var onRemove = function onRemove() {};
  return /*#__PURE__*/React.createElement(Box, {
    pad: "large",
    gap: "medium",
    align: "start"
  }, /*#__PURE__*/React.createElement(Tag, {
    name: "name",
    value: "value",
    onRemove: onRemove
  }), /*#__PURE__*/React.createElement(Tag, {
    value: "value",
    onRemove: onRemove
  }), /*#__PURE__*/React.createElement(Tag, {
    name: "name that is much longer and may need to wrap",
    value: "value",
    onRemove: onRemove
  }));
};
OnRemove.storyName = 'OnRemove';
export default {
  title: 'Type/Tag/OnRemove'
};