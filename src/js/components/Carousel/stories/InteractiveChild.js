import React from 'react';
import { Text, Button, Box } from 'grommet';
import { Carousel } from '../Carousel';

export const InteractiveSlides = () => (
  <Box align="center" pad="large">
    <Carousel controls="arrows" height="medium" width="medium">
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
    </Carousel>
  </Box>
);

InteractiveSlides.storyName = 'Interactive slides';

export default {
  title: 'Media/Carousel/Interactive slides',
};
