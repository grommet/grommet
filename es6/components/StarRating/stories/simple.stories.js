import React from 'react';
import { Box, StarRating } from 'grommet';
export var Simple = function Simple() {
  return /*#__PURE__*/React.createElement(Box, {
    align: "center",
    justify: "center",
    pad: "small"
  }, /*#__PURE__*/React.createElement(StarRating, {
    id: "star-rating",
    name: "rating"
  }));
};
export default {
  title: 'Input/StarRating/Simple'
};