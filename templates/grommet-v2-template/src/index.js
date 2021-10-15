import React from 'react';
import { render } from 'react-dom';

import { grommet, Box, Heading, Grommet, Paragraph } from 'grommet';

const App = () => (
  <Grommet theme={grommet}>
    <Box pad="small">
      <Heading level={3}>
        <strong>Hello World</strong>
      </Heading>
      <Paragraph>Hello from a Grommet page!</Paragraph>
    </Box>
  </Grommet>
);

render(<App />, document.getElementById('root'));
