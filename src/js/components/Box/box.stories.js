import React from 'react';
import { storiesOf } from '@storybook/react';
import { Attraction, Car } from 'grommet-icons';

import { Grommet, Anchor, Box, Button, Grid, Text } from '..';
import { grommet } from '../../themes';

const SimpleBox = () => (
  <Grommet theme={grommet}>
    <Box
      direction="row-responsive"
      justify="center"
      align="center"
      pad="xlarge"
      background="dark-2"
      gap="medium"
    >
      <Box
        pad="large"
        align="center"
        background={{ color: 'light-2', opacity: 'strong' }}
        round
        gap="small"
      >
        <Attraction size="large" />
        <Text>Party</Text>
        <Anchor href="" label="Link" />
        <Button label="Button" onClick={() => {}} />
      </Box>
      <Box pad="large" align="center" background="dark-3" round gap="small">
        <Car size="large" color="light-2" />
        <Text>Travel</Text>
        <Anchor href="" label="Link" />
        <Button label="Button" onClick={() => {}} />
      </Box>
    </Box>
  </Grommet>
);

const CustomColorBox = () => (
  <Grommet theme={grommet}>
    <Box
      justify="center"
      align="center"
      pad="xlarge"
      background="linear-gradient(102.77deg, #865ED6 -9.18%, #18BAB9 209.09%)"
      round="large"
    >
      <Text color="white">I have a linear gradient background</Text>
    </Box>
  </Grommet>
);

const FixedSizesBox = () => (
  <Grommet theme={grommet}>
    <Box pad="small" gap="small">
      <Box
        width="small"
        height="small"
        round="small"
        align="center"
        justify="center"
        background="brand"
        overflow={{ horizontal: 'hidden', vertical: 'scroll' }}
      >
        {Array(20)
          .fill()
          .map((_, i) => (
            <Text key={`${i + 0}`}>{`Small (${i})`}</Text>
          ))}
      </Box>
      <Box
        width="medium"
        height="medium"
        round="small"
        align="center"
        justify="center"
        background="brand"
      >
        Medium
      </Box>
      <Box
        width="large"
        height="large"
        round="small"
        align="center"
        justify="center"
        background="brand"
      >
        Large
      </Box>
    </Box>
  </Grommet>
);

const BorderBox = () => (
  <Grommet theme={grommet}>
    <Box pad="small" gap="small" align="start">
      <Box pad="small" border>
        true
      </Box>
      <Box direction="row-responsive" gap="small">
        {['horizontal', 'vertical', 'left', 'top', 'right', 'bottom'].map(
          border => (
            <Box key={border} pad="small" border={border}>
              {border}
            </Box>
          ),
        )}
      </Box>
      <Box pad="small" border={{ color: 'brand' }}>
        color
      </Box>
      <Box direction="row-responsive" gap="small" align="start">
        {['small', 'medium', 'large'].map(size => (
          <Box key={size} pad="small" border={{ size }}>
            {size}
          </Box>
        ))}
      </Box>
    </Box>
  </Grommet>
);

const RoundBox = () => (
  <Grommet theme={grommet}>
    <Box pad="small" gap="small">
      <Box pad="small" background="brand" round alignSelf="start">
        true
      </Box>
      <Grid columns="small" gap="small">
        {['xsmall', 'small', 'medium', 'large', 'xlarge', 'full'].map(size => (
          <Box key={size} pad="large" background="brand" round={{ size }}>
            {size}
          </Box>
        ))}
      </Grid>
      <Grid columns="small" gap="small">
        {[
          'left',
          'top',
          'right',
          'bottom',
          'top-left',
          'top-right',
          'bottom-left',
          'bottom-right',
        ].map(corner => (
          <Box key={corner} pad="small" background="brand" round={{ corner }}>
            {corner}
          </Box>
        ))}
      </Grid>
    </Box>
  </Grommet>
);

const BackgroundBox = () => (
  <Grommet theme={grommet}>
    <Box pad="small" gap="small" align="start">
      <Box
        pad="small"
        background={{ color: 'brand', opacity: true }}
        elevation="large"
      >
        brand opacity
      </Box>
      <Box pad="small" background="brand" elevation="large">
        brand
      </Box>
      <Box
        pad="small"
        background={{
          image:
            'url(http://librelogo.org/wp-content/uploads/2014/04/gradient2.png)',
        }}
      >
        image
      </Box>
      <Box
        pad="small"
        background={{
          color: 'accent-2',
          image:
            'url(http://librelogo.org/wp-content/uploads/2014/04/gradient2.png)',
        }}
      >
        image + color
      </Box>
    </Box>
  </Grommet>
);

const ElevationBox = () => (
  <Grommet theme={grommet}>
    <Box pad="small" gap="small" align="start">
      <Box pad="medium" background="dark-1" elevation="medium" gap="medium">
        <Text>on white</Text>
        <Box pad="medium" elevation="medium">
          <Text>on dark</Text>
        </Box>
      </Box>
    </Box>
  </Grommet>
);

storiesOf('Box', module)
  .add('Simple Box', () => <SimpleBox />)
  .add('Custom color', () => <CustomColorBox />)
  .add('Fixed sizes', () => <FixedSizesBox />)
  .add('Border', () => <BorderBox />)
  .add('Round', () => <RoundBox />)
  .add('Background', () => <BackgroundBox />)
  .add('Elevation', () => <ElevationBox />);
