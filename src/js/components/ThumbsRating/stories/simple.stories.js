import React from 'react';

import { Box, ThumbsRating } from 'grommet';

export const Simple = () => (
  <Box align="center" justify="center" pad="small">
    <ThumbsRating id="thumb-rating" name="rating" />
  </Box>
);

export default {
  title: 'Input/ThumbsRating/Simple',
};
