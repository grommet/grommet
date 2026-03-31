import React from 'react';
import { Attraction, Car, TreeOption } from 'grommet-icons';

import { Box, Button, Carousel, Text } from 'grommet';

export const Controlled = () => {
  const [activeSlide, setActiveSlide] = React.useState(0);

  return (
    // Uncomment <Grommet> lines when using outside of storybook
    // <Grommet theme={...}>
    <Box align="center" pad="large">
      <Box direction="row" gap="small" align="center">
        <Button label="-" onClick={() => setActiveSlide(activeSlide - 1)} />
        <Text>{activeSlide}</Text>
        <Button label="+" onClick={() => setActiveSlide(activeSlide + 1)} />
      </Box>
      <Carousel activeChild={activeSlide} onChild={setActiveSlide}>
        <Box pad="xlarge" background="light-1">
          <Attraction size="xlarge" />
        </Box>
        <Box pad="xlarge" background="light-2">
          <TreeOption size="xlarge" />
        </Box>
        <Box pad="xlarge" background="light-3">
          <Car size="xlarge" />
        </Box>
      </Carousel>
    </Box>
    // </Grommet>
  );
};

Controlled.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Media/Carousel/Controlled',
};
