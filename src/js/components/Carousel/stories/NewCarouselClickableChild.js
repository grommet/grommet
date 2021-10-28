import React from 'react';
import { Text, Button, Box } from 'grommet';

import { NewCarousel } from '../NewCarousel';

export const ClickableChild = () => (
  <Box align="center" pad="large">
    <NewCarousel height="600px" width="600px">
      <Box
        fill
        align="center"
        justify="center"
        background="lavender"
        gap="small"
      >
        <Text weight="bold" size="xlarge">
          Slide 1
        </Text>
        <Button label="Button" />
      </Box>
      <Box
        fill
        align="center"
        justify="center"
        background="light-3"
        gap="small"
      >
        <Text weight="bold" size="xlarge">
          Slide 2
        </Text>
        <Button label="Button" />
        <Button label="Button" />
      </Box>
      <Box
        fill
        align="center"
        justify="center"
        background="light-5"
        gap="small"
      >
        <Text weight="bold" size="xlarge">
          Slide 3
        </Text>
        <Button label="Button" />
        <Button label="Button" />
        <Button label="Button" />
      </Box>
    </NewCarousel>
  </Box>
);

ClickableChild.storyName = 'Clickable Child';

export default {
  title: 'Media/Carousel/New Carousel/Clickable Child',
};
