import React from 'react';
import { Box, ThumbsRating } from 'grommet';
export var Simple = function Simple() {
  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    justify: "center",
    pad: "small"
  }, /*#__PURE__*/React.createElement(ThumbsRating, {
    id: "thumb-rating",
    name: "rating"
  }));
};
export default {
  title: 'Input/ThumbsRating/Simple'
};