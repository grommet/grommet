import React from 'react';

import { Box, Heading, Markdown, Paragraph } from 'grommet';
import RoutedAnchor from '../components/RoutedAnchor';
import { Gremlin } from '../components';

export const Dashboard = () => (
  <Box align="center" pad={{ top: 'large', horizontal: 'small' }} fill>
    <Box flex align="center" overflow="auto">
      <Heading textAlign="center" level="2">
        Grommet Pattern #2
      </Heading>
      <Paragraph textAlign="center" color="dark-5">
        <Markdown>
          Here we show an integration with `react-router`. We add a sidebar
          where you can navigate between pages. Don't forget you can change
          pretty much anything since all components are exposed. This is just a
          reference implementation.
        </Markdown>
      </Paragraph>
      <Paragraph textAlign="center" color="dark-5">
        You can click <RoutedAnchor path="/www" label="here" /> for a not found
        example. This is a link that does not exist in this app and it will
        intentionally show a not found page.
      </Paragraph>
    </Box>
    <Gremlin />
  </Box>
);
