import React from 'react';
import { storiesOf } from '@storybook/react';

import { grommet, Box, Grommet, Card, Paragraph, Button } from 'grommet';

const BasicCard = () => (
  <Grommet theme={grommet}>
    <Box align="center" pad="medium">
      <Card title="Just a title!" />
    </Box>
    <Box align="center" pad="medium">
      <Card title="Card with paragraph!">
        <Paragraph>
          Paragraph xxlarge Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua.
        </Paragraph>
      </Card>
    </Box>
    <Box align="center" pad="medium">
      <Card title="Card title!">
        <Paragraph>
          Paragraph xxlarge Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua.
        </Paragraph>
        <Button primary label="Button" onClick={() => {}} />
      </Card>
    </Box>
  </Grommet>
);

storiesOf('Card', module).add('Basic', () => <BasicCard />);
