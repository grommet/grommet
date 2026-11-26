// SPDX-FileCopyrightText: © Hewlett Packard Enterprise Development LP
// SPDX-License-Identifier: Apache-2.0
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
