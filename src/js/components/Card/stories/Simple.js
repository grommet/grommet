import React from 'react';
import { storiesOf } from '@storybook/react';

import { grommet, Box, Card, Grommet } from 'grommet';

const Example = () => (
  <Grommet theme={grommet}>
    <Box pad="large" gap="medium" height="large" width="medium">
      <Card background="dark-1" header="header" footer="footer">
        content
      </Card>
      <Card header="header" footer="footer">
        content
      </Card>
    </Box>
  </Grommet>
);

storiesOf('Card', module).add('Simple', () => <Example />);
