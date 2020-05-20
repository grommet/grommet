import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  grommet,
  Anchor,
  Box,
  Card,
  Grommet,
  Heading,
  Image,
  Paragraph,
} from 'grommet';

const Example = () => (
  <Grommet theme={grommet}>
    <Box pad="medium" width="medium">
      <Card
        elevation="large"
        footer={
          <Box align="end">
            <Anchor
              href="https://www.collinsdictionary.com/us/dictionary/english/bridge"
              label="Learn More"
            />
          </Box>
        }
        pad="small"
      >
        <Image fit="cover" src="//v2.grommet.io/assets/IMG_4245.jpg" />
        <Heading level="3">Bridge</Heading>
        <Paragraph>
          A structure carrying a road, path, railroad, or canal across a river,
          ravine, road, railroad, or other obstacle.
        </Paragraph>
      </Card>
    </Box>
  </Grommet>
);

storiesOf('Card', module).add('Image', () => <Example />);
