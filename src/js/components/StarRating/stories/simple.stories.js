import React from 'react';

import { Box, StarRating } from 'grommet';

export const Simple = () => (
  <Box align="center" justify="center" pad="small">
    <StarRating id="star-rating" name="rating" />
  </Box>
);

export default {
  title: 'Input/StarRating/Simple',
};
