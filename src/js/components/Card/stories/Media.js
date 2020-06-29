import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  Anchor,
  Box,
  Card,
  Heading,
  CardBody,
  CardFooter,
  Grommet,
  Image,
  Paragraph,
} from 'grommet';

const theme = {
  global: {
    font: {
      family: `Comic Sans MS, -apple-system,
         BlinkMacSystemFont, 
         "Segoe UI", 
         Roboto`,
    },
  },
  card: {
    elevation: 'none',
    background: 'light-2',
    footer: {
      pad: 'medium',
    },
  },
};

const Example = () => (
  <Grommet theme={theme}>
    <Box pad="medium" align="start">
      <Card elevation="large" width="medium">
        <CardBody height="small">
          <Image
            fit="cover"
            src="//v2.grommet.io/assets/IMG_4245.jpg"
            a11yTitle="bridge"
          />
        </CardBody>
        <Box pad={{ horizontal: 'medium' }} responsive={false}>
          <Heading level="3" margin={{ vertical: 'medium' }}>
            Bridge
          </Heading>
          <Paragraph margin={{ top: 'none' }}>
            A structure carrying a road, path, railroad, or canal across a
            river, ravine, road, railroad, or other obstacle.
          </Paragraph>
        </Box>
        <CardFooter>
          <Anchor
            href="https://www.collinsdictionary.com/us/dictionary/english/bridge"
            label="Learn More"
          />
        </CardFooter>
      </Card>
    </Box>
  </Grommet>
);

storiesOf('Card', module).add('Media', () => <Example />);
