import React from 'react';
import { Attraction, Car, TreeOption } from 'grommet-icons';

import { Grommet, Box, Button, Carousel } from 'grommet';

export const WithClickableChild = () => (
  <Grommet>
    <Box align="center" pad="large">
      <Carousel>
        <Box
          align="center"
          gap="medium"
          pad="xlarge"
          background="background-contrast"
          direction="row"
        >
          <Attraction size="xlarge" />
          <Button label="Learn More" />
        </Box>
        <Box
          align="center"
          gap="medium"
          pad="xlarge"
          background="background-contrast"
          direction="row"
        >
          <TreeOption size="xlarge" />
          <Button label="Visit" />
        </Box>
        <Box pad="xlarge" background="accent-3">
          <Car size="xlarge" />
        </Box>
      </Carousel>
    </Box>
  </Grommet>
);

WithClickableChild.storyName = 'With Clickable Child';

export default {
  title: 'Media/Carousel/With Clickable Child',
};
