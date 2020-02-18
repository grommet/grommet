import React from 'react';
import { storiesOf } from '@storybook/react';

import { grommet, Box, Grommet, Card, Paragraph, Button } from 'grommet';

const paragraphFiller = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua.
`;

const WithImage = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="medium">
      <Card image="http://placehold.it/350x180" title="Card title">
        <Paragraph>{paragraphFiller}</Paragraph>
        <Button primary label="Button" onClick={() => {}} />
      </Card>
    </Box>
    <Box align="center" pad="medium" direction="row" align="baseline">
      <Card
        image="https://i.picsum.photos/id/129/200/300.jpg"
        title="Card title"
      >
        <Paragraph>{paragraphFiller}</Paragraph>
      </Card>
      <Card
        image="https://i.picsum.photos/id/129/200/300.jpg"
        title="Card title"
      >
        <Paragraph>{paragraphFiller}</Paragraph>
        <Button primary label="Button" onClick={() => {}} />
      </Card>
    </Box>
  </Grommet>
);

storiesOf('Card', module).add('With image', () => <WithImage />);
