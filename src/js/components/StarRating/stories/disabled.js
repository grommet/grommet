import React from 'react';

import { Box, Grommet, StarRating } from 'grommet';

export const Disabled = () => (
  <Grommet
    theme={{ global: { control: { disabled: { cursor: 'not-allowed' } } } }}
  >
    <Box align="center" justify="center" pad="small">
      <StarRating id="star-rating" name="rating" disabled />
    </Box>
  </Grommet>
);

export default {
  title: 'Input/StarRating/Disabled',
};
