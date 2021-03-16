import React from 'react';

import {
  Box,
  Columns,
  Grommet,
  Header,
  Heading,
  Main,
  Menu,
  Paragraph,
} from 'grommet';
import { grommet } from 'grommet/themes';

const paragraphFiller = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua.
`;

export const MainAside = () => (
  <Grommet theme={grommet} full>
    <Columns>
      <Main gap="medium">
        <Header border="bottom">
          <Box direction="row" align="center">
            <Heading size="small">Welcome</Heading>
          </Box>
          <Menu label="actions" />
        </Header>
        <Columns center={false} aside="medium">
          <Box>
            <Paragraph>{paragraphFiller}</Paragraph>
          </Box>
          <Box pad={{ horizontal: 'medium' }} background="background-contrast">
            <Paragraph>{paragraphFiller}</Paragraph>
          </Box>
        </Columns>
      </Main>
    </Columns>
  </Grommet>
);

export default {
  title: 'Layout/Columns/Main Aside',
};
