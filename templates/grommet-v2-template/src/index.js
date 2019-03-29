import React, { Component } from 'react';
import { render } from 'react-dom';

import { grommet, Box, Heading, Grommet, Paragraph } from 'grommet';

class App extends Component {
  render() {
    return (
      <Grommet theme={grommet}>
        <Box pad="small">
          <Heading level={3}>
            <strong>Hello World</strong>
          </Heading>
          <Paragraph>Hello from a Grommet page!</Paragraph>
        </Box>
      </Grommet>
    );
  }
}

render(<App />, document.getElementById('root'));
