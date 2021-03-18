import React from 'react';

import {
  ColumnCenter,
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

export const Default = () => (
  <Grommet theme={grommet}>
    <ColumnCenter>
      <Main>
        <Header border="bottom">
          <Heading size="small">Welcome</Heading>
          <Menu label="actions" />
        </Header>
        <Paragraph>{paragraphFiller}</Paragraph>
      </Main>
    </ColumnCenter>
  </Grommet>
);

export default {
  title: 'Layout/ColumnCenter/Default',
};
