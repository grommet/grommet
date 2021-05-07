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
import { Next, Previous } from 'grommet-icons';

const paragraphFiller = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua.
`;

export const MainAside = () => (
  <Grommet theme={grommet} full>
    <Columns fill width="xlarge">
      <Main gap="medium">
        <Header border="bottom">
          <Box direction="row" align="center">
            <Heading size="small">Welcome</Heading>
          </Box>
          <Menu label="actions" />
        </Header>
        <Columns
          columns={[
            undefined,
            {
              hide: false,
              width: 'medium',
              responsive: { hide: true, width: 'auto' },
            },
          ]}
        >
          <Box>
            <Paragraph>{paragraphFiller}</Paragraph>
            <Box alignSelf="end">
              <Columns.ToggleButton child={1} icon={<Next />} />
            </Box>
          </Box>
          <Box
            as="aside"
            pad={{ horizontal: 'medium' }}
            background="background-contrast"
          >
            <Columns.ToggleButton child={1} icon={<Previous />} />
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
