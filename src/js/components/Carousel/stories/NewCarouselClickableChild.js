import React from 'react';
import { Grommet, Text, Button, Box } from 'grommet';

import { NewCarousel } from '../NewCarousel';

export const ClickableChild = () => (
  <Grommet>
    <Box align="center" pad="large">
      <NewCarousel height="600px" width="600px">
        <Box
          fill
          align="center"
          justify="center"
          background="light-4"
          gap="large"
        >
          <Text weight="bold" size="xlarge">
            Slide One
          </Text>
          <Button label="Click Me!" color="black" />
        </Box>
        <Box
          fill
          align="center"
          justify="center"
          background="light-4"
          gap="large"
        >
          <Text weight="bold" size="xlarge">
            Slide Two
          </Text>
          <Button color="black" label="Click Me!" />
        </Box>
        <Box
          fill
          align="center"
          justify="center"
          background="light-4"
          gap="large"
        >
          <Text weight="bold" size="xlarge">
            Slide Three
          </Text>
          <Button label="Click Me!" color="black" />
        </Box>
      </NewCarousel>
    </Box>
  </Grommet>
);

ClickableChild.storyName = 'Clickable Child';

export default {
  title: 'Media/Carousel/New Carousel/Clickable Child',
};
