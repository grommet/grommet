import React from 'react';

import {
  Card,
  CardBody,
  CardHeader,
  Columns,
  Grommet,
  Heading,
  Paragraph,
} from 'grommet';
import { grommet } from 'grommet/themes';

const paragraphFiller = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua.
`;

export const Uniform = () => (
  <Grommet theme={grommet} full>
    <Columns size="small" gap="medium" margin={{ vertical: 'medium' }}>
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
    </Columns>
  </Grommet>
);

export default {
  title: 'Layout/Columns/Uniform',
};
