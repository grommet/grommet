import React from 'react';
import { Attraction, Car, TreeOption } from 'grommet-icons';
import { Box, Button, Text } from 'grommet';
import { Carousel } from '../Carousel';

export const Controlled = () => {
  const [activeSlide, setActiveSlide] = React.useState(0);

  return (
    <Box align="center" pad="large" gap="small">
      <Text size="small">{`Active Slide: ${activeSlide}`}</Text>
      <Box direction="row" gap="small" align="center">
        <Button
          label="-"
          onClick={() => {
            setActiveSlide(activeSlide === 0 ? 0 : activeSlide - 1);
          }}
        />
        <Button
          label="+"
          onClick={() => {
            setActiveSlide(activeSlide === 2 ? 2 : activeSlide + 1);
          }}
        />
      </Box>
      <Carousel controls={false} activeChild={activeSlide}>
        <Box pad="xlarge" background="accent-1">
          <Attraction size="xlarge" />
        </Box>
        <Box pad="xlarge" background="accent-2">
          <TreeOption size="xlarge" />
        </Box>
        <Box pad="xlarge" background="accent-3">
          <Car size="xlarge" />
        </Box>
      </Carousel>
    </Box>
  );
};
Controlled.parameters = {
  chromatic: { disable: true },
};

export default {
  title: 'Media/Carousel/Controlled',
};
