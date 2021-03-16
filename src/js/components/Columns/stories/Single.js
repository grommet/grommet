import React from 'react';

import {
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

export const Single = () => (
  <Grommet theme={grommet}>
    <Columns>
      <Main>
        <Header border="bottom">
          <Heading size="small">Welcome</Heading>
          <Menu label="actions" />
        </Header>
        <Paragraph>{paragraphFiller}</Paragraph>
      </Main>
    </Columns>
  </Grommet>
);

export default {
  title: 'Layout/Columns/Single',
};
