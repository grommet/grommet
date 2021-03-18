import React from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  ColumnCenter,
  Grid,
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

export const Cards = () => (
  <Grommet theme={grommet}>
    <ColumnCenter>
      <Main>
        <Header border="bottom">
          <Heading size="small">Welcome</Heading>
          <Menu label="actions" />
        </Header>
        <Grid columns="small" gap="medium" margin={{ vertical: 'medium' }}>
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Card key={i}>
              <CardHeader pad="small">
                <Heading level={2} size="small" margin="none">
                  Item
                </Heading>
              </CardHeader>
              <CardBody pad="small">
                <Paragraph>{paragraphFiller}</Paragraph>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </Main>
    </ColumnCenter>
  </Grommet>
);

export default {
  title: 'Layout/ColumnCenter/Cards',
};
